
import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "pulse" | "shimmer" | "wave" | "none";
}

function Skeleton({
  className,
  variant = "pulse",
  ...props
}: SkeletonProps) {
  // Create variant-specific styling
  const getVariantClass = () => {
    switch (variant) {
      case "pulse":
        return "animate-pulse";
      case "shimmer":
        return "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent relative overflow-hidden";
      case "wave":
        return "before:absolute before:inset-0 before:-translate-x-full before:animate-[waves_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent relative overflow-hidden";
      case "none":
      default:
        return "";
    }
  };

  return (
    <div
      className={cn("rounded-md bg-muted", getVariantClass(), className)}
      {...props}
    />
  );
}

// Motion version of the skeleton
interface MotionSkeletonProps extends Omit<HTMLMotionProps<"div">, "animate"> {
  className?: string;
  variant?: "pulse" | "shimmer" | "wave" | "none";
  animate?: HTMLMotionProps<"div">["animate"];
}

function MotionSkeleton({
  className,
  variant = "pulse",
  animate: customAnimate,
  ...props
}: MotionSkeletonProps) {
  // Get the base variant class
  const variantClass = variant === "pulse" ? "" : variant === "none" ? "" :
    "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent relative overflow-hidden";
  
  // For pulse variant, use framer-motion animations
  const defaultPulseAnimate = variant === "pulse" ? {
    opacity: [0.5, 0.8, 0.5],
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "easeInOut"
    }
  } : {};
  
  const animateProps = customAnimate || defaultPulseAnimate;

  return (
    <motion.div
      className={cn("rounded-md bg-muted", variantClass, className)}
      animate={animateProps}
      {...props}
    />
  );
}

export { Skeleton, MotionSkeleton }
