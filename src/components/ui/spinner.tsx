import type { ComponentProps } from "react"
import { LoaderCircle } from "lucide-react"
import { cn } from "@/lib/utils"

/** Continuous activity remains visible even when decorative motion is reduced. */
function Spinner({ className, ...props }: ComponentProps<"svg">) {
  return (
    <LoaderCircle
      aria-hidden="true"
      data-slot="spinner"
      className={cn("cwm-activity-spinner size-4 shrink-0", className)}
      {...props}
    />
  )
}

export { Spinner }
