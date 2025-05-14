
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

// Enhanced collapsible content with animations
const AnimatedCollapsibleContent = motion(CollapsiblePrimitive.CollapsibleContent)

// Custom styled versions
const StyledCollapsible = ({ className, ...props }: React.ComponentProps<typeof Collapsible>) => (
  <Collapsible className={cn("group", className)} {...props} />
)

const StyledCollapsibleTrigger = ({ className, children, ...props }: React.ComponentProps<typeof CollapsibleTrigger>) => (
  <CollapsibleTrigger 
    className={cn(
      "flex w-full items-center justify-between px-4 py-2 text-sm font-medium transition-all hover:bg-muted/50 rounded-md", 
      className
    )} 
    {...props}
  >
    {children}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  </CollapsibleTrigger>
)

const StyledCollapsibleContent = ({ className, ...props }: React.ComponentProps<typeof AnimatedCollapsibleContent>) => (
  <AnimatedCollapsibleContent
    className={cn("overflow-hidden transition-all", className)}
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: "auto", opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    {...props}
  />
)

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  StyledCollapsible,
  StyledCollapsibleTrigger,
  StyledCollapsibleContent,
  AnimatedCollapsibleContent
}
