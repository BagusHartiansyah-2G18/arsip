import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const kbdVariants = cva(
    "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100",
    {
        variants: {
            variant: {
                default: "border-border bg-muted text-muted-foreground",
                outline: "border-border bg-background text-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface KbdProps
    extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> { }

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
    ({ className, variant, ...props }, ref) => {
        return (
            <kbd
                ref={ref}
                className={cn(kbdVariants({ variant, className }))}
                {...props}
            />
        )
    }
)
Kbd.displayName = "Kbd"

export { Kbd, kbdVariants }
