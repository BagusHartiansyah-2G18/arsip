"use client";

/**
 * @author: @dorian_baffier
 * @description: Shape Hero
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { motion } from "motion/react";
import { Pacifico } from "next/font/google";
import { cn } from "@/lib/utils";

const pacifico = Pacifico({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-pacifico",
});

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
    borderRadius = 16,
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
    borderRadius?: number;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    style={{ borderRadius }}
                    className={cn(
                        "absolute inset-0",
                        "bg-linear-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[1px]",
                        "ring-1 ring-white/[0.03] dark:ring-white/[0.02]",
                        "shadow-[0_2px_16px_-2px_rgba(255,255,255,0.04)]",
                        "after:absolute after:inset-0",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.12),transparent_70%)]",
                        "after:rounded-[inherit]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

export default function ShapeHero({
    title1 = "Welcome",
    title2 = "User",
    height = 150,
}: {
    title1?: string;
    title2?: string;
    height?: number;
}) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };

    return (
        <div
            className="relative w-full flex items-center justify-center overflow-hidden border border-white/20 rounded-xl bg-white/10 backdrop-blur-sm shadow-lg"
            style={{ height: `${height}px` }}
        >
            <div className="absolute inset-0 bg-linear-to-br from-indigo-500/[0.15] via-transparent to-rose-500/[0.15] blur-xl" />

            <div className="absolute inset-0 overflow-hidden">
                {/* Adjusted shapes for smaller height */}
                <ElegantShape
                    delay={0.3}
                    width={100}
                    height={80}
                    rotate={-8}
                    borderRadius={12}
                    gradient="from-indigo-500/[0.25] dark:from-indigo-500/[0.35]"
                    className="left-[5%] top-[20%]"
                />

                <ElegantShape
                    delay={0.5}
                    width={120}
                    height={60}
                    rotate={15}
                    borderRadius={10}
                    gradient="from-rose-500/[0.25] dark:from-rose-500/[0.35]"
                    className="right-[10%] bottom-[20%]"
                />

                <ElegantShape
                    delay={0.4}
                    width={70}
                    height={70}
                    rotate={24}
                    borderRadius={16}
                    gradient="from-violet-500/[0.25] dark:from-violet-500/[0.35]"
                    className="left-[25%] top-[40%]"
                />

                <ElegantShape
                    delay={0.6}
                    width={80}
                    height={40}
                    rotate={-20}
                    borderRadius={8}
                    gradient="from-amber-500/[0.25] dark:from-amber-500/[0.35]"
                    className="right-[25%] top-[15%]"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        custom={1}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        variants={fadeUpVariants as any}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3 tracking-tight text-gray-800 dark:text-white drop-shadow-lg border-b border-white/30 pb-1">
                            <span className="block">
                                {title1}
                            </span>
                            <span
                                className={cn(
                                    "block mt-1 text-indigo-600 dark:text-indigo-300 font-bold",
                                    pacifico.className
                                )}
                            >
                                {title2}
                            </span>
                        </h1>
                    </motion.div>
                </div>
            </div>

            <div className="absolute inset-0 bg-linear-to-t from-white/30 via-transparent to-white/60 pointer-events-none" />
        </div>
    );
}
