'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

export interface AutocompleteOption {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
}

interface AutocompleteProps {
    options: AutocompleteOption[];
    value: string;
    // eslint-disable-next-line no-unused-vars
    onValueChange: (value: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    loadingText?: string;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    width?: 'auto' | 'full';
    allowClear?: boolean;
}

export function Autocomplete({
    options,
    value,
    onValueChange,
    placeholder = "Select an option...",
    searchPlaceholder = "Search...",
    emptyText = "No options found.",
    loadingText = "Loading...",
    disabled = false,
    loading = false,
    className,
    width = 'full',
    allowClear = true,
}: AutocompleteProps) {
    const [open, setOpen] = React.useState(false);

    const selectedOption = options.find((option) => option.value === value);

    const widthClass = width === 'full' ? 'w-full' : 'w-auto';

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "justify-between",
                        widthClass,
                        className
                    )}
                    disabled={disabled}
                >
                    <div className="flex items-center flex-1 min-w-0">
                        {selectedOption ? (
                            <span className="truncate">{selectedOption.label}</span>
                        ) : (
                            <span className="text-muted-foreground">{placeholder}</span>
                        )}
                    </div>
                    <div className="flex items-center gap-1">
                        {allowClear && selectedOption && !disabled && (
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onValueChange('');
                                }}
                                className="hover:bg-muted rounded-sm p-1 cursor-pointer"
                                role="button"
                                tabIndex={0}
                                aria-label="Clear selection"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onValueChange('');
                                    }
                                }}
                            >
                                <X className="h-3 w-3 opacity-50 hover:opacity-100" />
                            </div>
                        )}
                        <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className={cn("p-0", widthClass)}
                align="start"
                style={{ width: 'var(--radix-popover-trigger-width)' }}
            >
                <Command>
                    <CommandInput placeholder={searchPlaceholder} />
                    <CommandList>
                        {options.length === 0 && !loading && (
                            <CommandEmpty>
                                {emptyText}
                            </CommandEmpty>
                        )}
                        {loading && (
                            <div className="py-6 text-center text-sm">
                                {loadingText}
                            </div>
                        )}
                        {options.length > 0 && (
                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={`${option.label} ${option.description || ''}`}
                                        disabled={option.disabled}
                                        className={cn(
                                            "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground"
                                        )}
                                        onSelect={() => {
                                            if (!option.disabled) {
                                                onValueChange(option.value);
                                                setOpen(false);
                                            }
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (!option.disabled) {
                                                onValueChange(option.value);
                                                setOpen(false);
                                            }
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === option.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-medium">{option.label}</span>
                                            {option.description && (
                                                <span className="text-sm text-muted-foreground truncate">
                                                    {option.description}
                                                </span>
                                            )}
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

// Helper function to create options from array of objects
export function createAutocompleteOptions<T>(
    items: T[],
    // eslint-disable-next-line no-unused-vars
    getValue: (item: T) => string,
    // eslint-disable-next-line no-unused-vars
    getLabel: (item: T) => string,
    // eslint-disable-next-line no-unused-vars
    getDescription?: (item: T) => string | undefined,
    // eslint-disable-next-line no-unused-vars
    getDisabled?: (item: T) => boolean | undefined
): AutocompleteOption[] {
    return items.map((item) => ({
        value: getValue(item),
        label: getLabel(item),
        description: getDescription?.(item),
        disabled: getDisabled?.(item),
    }));
}
