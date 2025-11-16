import * as React from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface LoadingStateProps {
    title?: string
    description?: string
    className?: string
}

const LoadingState = React.forwardRef<HTMLDivElement, LoadingStateProps>(
    ({ title = "Processing your request", description = "Please wait while we process your request. Do not refresh the page.", className }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "flex flex-col items-center justify-center py-12 px-6 text-center",
                    className
                )}
            >
                {/* Loading Spinner */}
                <div className="mb-6">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>

                {/* Content */}
                <div className="space-y-3 max-w-sm">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                </div>
            </div>
        )
    }
)

LoadingState.displayName = "LoadingState"

export { LoadingState }
