
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const AspectRatio = AspectRatioPrimitive.Root

// Create a motion-enhanced version for animations
const MotionAspectRatio = motion(AspectRatio)

// Animated variants for aspect ratio content
const animationVariants = {
  slideIn: {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  },
  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    exit: { scale: 0.9, opacity: 0, transition: { duration: 0.3 } }
  },
  flip: {
    initial: { rotateY: 90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1, transition: { duration: 0.6 } },
    exit: { rotateY: -90, opacity: 0, transition: { duration: 0.4 } }
  }
}

// Wrapper component with pre-configured animations
const AnimatedAspectRatio = ({
  children,
  ratio,
  animationVariant = "fadeIn",
  className,
  ...props
}: {
  children: React.ReactNode,
  ratio?: number,
  animationVariant?: keyof typeof animationVariants,
  className?: string,
  [key: string]: any
}) => (
  <MotionAspectRatio
    ratio={ratio}
    className={cn(className)}
    initial="initial"
    animate="animate"
    exit="exit"
    variants={animationVariants[animationVariant]}
    {...props}
  >
    {children}
  </MotionAspectRatio>
)

export { AspectRatio, MotionAspectRatio, AnimatedAspectRatio }
