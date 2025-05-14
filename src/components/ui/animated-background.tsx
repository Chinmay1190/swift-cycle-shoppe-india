
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "dots" | "gradient" | "noise" | "grid" | "morphing";
  intensity?: "light" | "medium" | "strong";
  speed?: "slow" | "medium" | "fast";
  className?: string;
  children?: React.ReactNode;
}

export function AnimatedBackground({
  variant = "gradient",
  intensity = "medium",
  speed = "medium",
  className,
  children,
  ...props
}: AnimatedBackgroundProps) {
  // Define intensity values
  const intensityMap = {
    light: {
      opacity: 0.05,
      blur: "blur-sm",
    },
    medium: {
      opacity: 0.1,
      blur: "blur-md",
    },
    strong: {
      opacity: 0.15,
      blur: "blur-lg",
    },
  };

  // Define animation speed
  const speedMap = {
    slow: 15,
    medium: 10,
    fast: 5,
  };

  // Style based on variant
  const getVariantStyle = () => {
    switch (variant) {
      case "dots":
        return "bg-[radial-gradient(rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:20px_20px]";
      case "gradient":
        return "bg-gradient-to-br from-primary/10 via-transparent to-primary/5";
      case "noise":
        return "bg-noise bg-opacity-5";
      case "grid":
        return "bg-grid-lines bg-[size:40px_40px]";
      case "morphing":
        return "bg-gradient-radial from-primary/5 to-transparent";
      default:
        return "bg-gradient-to-br from-primary/10 via-transparent to-primary/5";
    }
  };

  // Animation variants for shapes
  const shapeVariants = {
    initial: {},
    animate: {
      y: [0, -10, 0],
      opacity: [intensityMap[intensity].opacity, intensityMap[intensity].opacity * 0.7, intensityMap[intensity].opacity],
      transition: {
        duration: speedMap[speed],
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Morphing circle variants
  const morphingVariants = {
    initial: {},
    animate: {
      scale: [1, 1.1, 1],
      borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 40% / 50% 60% 30% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"],
      transition: {
        duration: speedMap[speed] * 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      <div className={cn("absolute inset-0 z-0", getVariantStyle())} />

      {/* Animated shapes - only for certain variants */}
      {(variant === "gradient" || variant === "noise") && (
        <>
          <motion.div
            variants={shapeVariants}
            initial="initial"
            animate="animate"
            className={cn(
              "absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/5",
              intensityMap[intensity].blur
            )}
          />
          <motion.div
            variants={shapeVariants}
            initial="initial"
            animate="animate"
            custom={1}
            className={cn(
              "absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-primary/10",
              intensityMap[intensity].blur
            )}
            style={{ animationDelay: "2s" }}
          />
        </>
      )}

      {/* Morphing background */}
      {variant === "morphing" && (
        <motion.div
          variants={morphingVariants}
          initial="initial"
          animate="animate"
          className={cn(
            "absolute top-1/4 left-1/3 w-[30vw] h-[30vw] bg-primary/5",
            intensityMap[intensity].blur
          )}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
