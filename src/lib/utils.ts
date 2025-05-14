
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Animation variants for staggered children
export const staggerContainer = (staggerChildren: number, delayChildren: number = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
})

// Fade up animation for children
export const fadeUpVariant = {
  hidden: { 
    y: 20, 
    opacity: 0 
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.8,
      bounce: 0.4,
    },
  },
}

// Fade in animation with scale
export const fadeInScale = {
  hidden: { 
    opacity: 0,
    scale: 0.9
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
}

// Float animation
export const floatingAnimation = {
  initial: {},
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
}

// Pulse animation
export const pulseAnimation = {
  initial: {},
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
}

// Rotating animation
export const rotatingAnimation = {
  initial: {},
  animate: {
    rotate: [0, 5, 0, -5, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
}
