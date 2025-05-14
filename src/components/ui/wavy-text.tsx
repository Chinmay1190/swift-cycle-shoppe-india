
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { waveTextAnimation, waveCharAnimation } from "@/lib/utils";

interface WavyTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  as?: React.ElementType;
}

export function WavyText({
  text,
  className,
  delay = 0,
  duration = 1.5,
  as: Component = "span",
}: WavyTextProps) {
  // Custom variant with duration
  const customWaveChar = {
    ...waveCharAnimation,
    animate: {
      ...waveCharAnimation.animate,
      transition: {
        ...waveCharAnimation.animate.transition,
        duration,
      },
    },
  };

  return (
    <Component className={cn("inline-block", className)}>
      <motion.span
        variants={waveTextAnimation(delay)}
        initial="initial"
        animate="animate"
        className="inline-block whitespace-nowrap"
      >
        {Array.from(text).map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            variants={customWaveChar}
            className="inline-block"
            style={{ originY: 0.7 }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}
