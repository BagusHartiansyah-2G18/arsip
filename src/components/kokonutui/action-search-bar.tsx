"use client";

/**
 * @author: @kokonutui
 * @description: A modern search bar component with action buttons and suggestions
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { useState, useEffect, useMemo, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";
import {
    Search,
    BarChart2,
    Video,
    PlaneTakeoff,
    AudioLines,
    LayoutGrid,
    X,
} from "lucide-react";
import { useDebounce } from "@/hooks";

interface Action {
    id: string;
    label: string;
    icon?: React.ReactNode;
    description?: string;
    short?: string;
    end?: string;
    value?: string;
}

interface SearchResult {
    actions: Action[];
}

const ANIMATION_VARIANTS = {
    container: {
        hidden: { opacity: 0, height: 0 },
        show: {
            opacity: 1,
            height: "auto",
            maxHeight: "15rem",
            transition: {
                height: { duration: 0.4 },
                staggerChildren: 0.1,
            },
        },
        exit: {
            opacity: 0,
            height: 0,
            transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.2 },
            },
        },
    },
    item: {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 },
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: { duration: 0.2 },
        },
    },
} as const;

const allActionsSample = [
    {
        id: "1",
        label: "Book tickets",
        icon: <PlaneTakeoff className="h-4 w-4 text-blue-500" />,
        description: "Operator",
        short: "⌘K",
        end: "Agent",
    },
    {
        id: "2",
        label: "Summarize",
        icon: <BarChart2 className="h-4 w-4 text-orange-500" />,
        description: "gpt-5",
        short: "⌘cmd+p",
        end: "Command",
    },
    {
        id: "3",
        label: "Screen Studio",
        icon: <Video className="h-4 w-4 text-purple-500" />,
        description: "Claude 4.1",
        short: "",
        end: "Application",
    },
    {
        id: "4",
        label: "Talk to Jarvis",
        icon: <AudioLines className="h-4 w-4 text-green-500" />,
        description: "gpt-5 voice",
        short: "",
        end: "Active",
    },
    {
        id: "5",
        label: "Kokonut UI - Pro",
        icon: <LayoutGrid className="h-4 w-4 text-blue-500" />,
        description: "Components",
        short: "",
        end: "Link",
    },
];

function ActionSearchBar({
    actions = allActionsSample,
    defaultOpen = false,
    placeholder = "What's up?",
    onSelect,
    onClear,
    value,
}: {
    actions?: Action[];
    defaultOpen?: boolean;
    placeholder?: string;
    // eslint-disable-next-line no-unused-vars
    onSelect?: (action: Action) => void;
    onClear?: () => void;
    value?: string;
}) {
    const [query, setQuery] = useState(value || "");
    const [result, setResult] = useState<SearchResult | null>(null);
    const [isFocused, setIsFocused] = useState(defaultOpen);
    const [, setIsTyping] = useState(false);
    const [selectedAction, setSelectedAction] = useState<Action | null>(null);
    const [activeIndex, setActiveIndex] = useState(-1);
    const debouncedQuery = useDebounce(query, 200);

    // Sync query with value prop changes
    useEffect(() => {
        if (value !== undefined) {
            setQuery(value);
            // Find and set the selected action based on the value
            const matchingAction = actions.find(action => action.label === value);
            setSelectedAction(matchingAction || null);
        }
    }, [value, actions]);

    const filteredActions = useMemo(() => {
        if (!debouncedQuery) return actions;
        const normalizedQuery = debouncedQuery.toLowerCase().trim();
        return actions.filter((action) => {
            const searchableText =
                `${action.label} ${action.description || ""}`.toLowerCase();
            return searchableText.includes(normalizedQuery);
        });
    }, [debouncedQuery, actions]);

    useEffect(() => { 
        if (!isFocused) {
            setResult(null);
            setActiveIndex(-1);
            return;
        }
        // console.log(filteredActions);
        
        setResult({ actions: filteredActions });
        setActiveIndex(-1);
    }, [filteredActions, isFocused]);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => { 
            
            setQuery(e.target.value);
            setIsTyping(true);
            setActiveIndex(-1);
        },
        []
    );

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (!result?.actions.length) return;

            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    setActiveIndex((prev) =>
                        prev < result.actions.length - 1 ? prev + 1 : 0
                    );
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    setActiveIndex((prev) =>
                        prev > 0 ? prev - 1 : result.actions.length - 1
                    );
                    break;
                case "Enter":
                    e.preventDefault();
                    if (activeIndex >= 0 && result.actions[activeIndex]) {
                        const action = result.actions[activeIndex];
                        setSelectedAction(action);
                        setQuery(action.label);
                        onSelect?.(action);
                        setIsFocused(false);
                    }
                    break;
                case "Escape":
                    setIsFocused(false);
                    setActiveIndex(-1);
                    break;
            }
        },
        [result?.actions, activeIndex]
    );

    const handleActionClick = useCallback((action: Action) => {
        setSelectedAction(action);
        setQuery(action.label);
        onSelect?.(action);
        setIsFocused(false);
    }, [onSelect]);

    const handleFocus = useCallback(() => {
        setIsFocused(true);
        setActiveIndex(-1);
        // Don't reset selectedAction here to preserve the current selection
    }, []);

    const handleBlur = useCallback(() => {
        setTimeout(() => {
            setIsFocused(false);
            setActiveIndex(-1);
        }, 200);
    }, []);

    const handleClearSelection = useCallback(() => {
        setQuery("");
        setSelectedAction(null);
        onClear?.();
        setIsFocused(false);
        setActiveIndex(-1);
    }, [onClear]);
  
    return (
        <div className="w-full">
            <div className="relative">
                <div className="w-full">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder={placeholder}
                            value={query}
                            onChange={handleInputChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            role="combobox"
                            aria-expanded={isFocused && !!result}
                            aria-autocomplete="list"
                            aria-activedescendant={
                                activeIndex >= 0
                                    ? `action-${result?.actions[activeIndex]?.id}`
                                    : undefined
                            }
                            id="search"
                            autoComplete="off"
                            className={`pl-3 pr-9 py-1.5 h-9 text-sm rounded-lg focus-visible:ring-offset-0 ${selectedAction && !isFocused ? 'bg-gray-50 text-gray-900' : ''
                                }`}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
                            <AnimatePresence mode="popLayout">
                                {query.length > 0 ? (
                                    <motion.div
                                        key="clear"
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 20, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="cursor-pointer hover:bg-gray-100 rounded-full p-1 flex items-center justify-center"
                                        onClick={handleClearSelection}
                                    >
                                        <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="search"
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 20, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex items-center justify-center"
                                    >
                                        <Search className="w-4 h-4 text-gray-400" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <AnimatePresence>
                        {isFocused && result && (
                            <motion.div
                                className="w-full border border-gray-200 rounded-lg shadow-lg overflow-hidden bg-white mt-1 absolute top-full z-50 max-h-60"
                                variants={ANIMATION_VARIANTS.container}
                                role="listbox"
                                aria-label="Search results"
                                initial="hidden"
                                animate="show"
                                exit="exit"
                            >
                                <motion.ul role="none" className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                    {result.actions.map((action) => {  
                                        return (
                                            <motion.li
                                                key={action.id}
                                                id={`action-${action.id}`}
                                                className={`px-3 py-2 flex items-center justify-between hover:bg-gray-100 cursor-pointer rounded-md transition-colors duration-200 ${activeIndex ===
                                                    result.actions.indexOf(action)
                                                    ? "bg-gray-50"
                                                    : ""
                                                    }`}
                                                // variants={ANIMATION_VARIANTS.item}
                                                layout
                                                onClick={() =>
                                                    handleActionClick(action)
                                                }
                                                role="option"
                                                aria-selected={
                                                    activeIndex ===
                                                    result.actions.indexOf(action)
                                                }
                                            >
                                                <div className="flex items-center gap-2 justify-between">
                                                    <div className="flex items-center gap-2">
                                                        {action.icon && (
                                                            <span
                                                                className="text-gray-500"
                                                                aria-hidden="true"
                                                            >
                                                                {action.icon}
                                                            </span>
                                                        )}
                                                        <span className="text-sm font-medium text-gray-900">
                                                            {action.label}
                                                        </span>
                                                        {action.description && (
                                                            <span className="text-xs text-gray-400">
                                                                {action.description} 
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {action.short && (
                                                        <span
                                                            className="text-xs text-gray-400"
                                                            aria-label={`Keyboard shortcut: ${action.short}`}
                                                        >
                                                            {action.short}
                                                        </span>
                                                    )}
                                                    {action.end && (
                                                        <span className="text-xs text-gray-400 text-right">
                                                            {action.end}
                                                        </span>
                                                    )}
                                                </div>
                                            </motion.li>
                                        )
                                    })}
                                </motion.ul>
                                <div className="mt-2 px-3 py-2 border-t border-gray-200">
                                    <div className="flex items-center justify-between text-xs text-gray-600">
                                        <span>Press ⌘K to open commands</span>
                                        <span>ESC to cancel</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default ActionSearchBar;
