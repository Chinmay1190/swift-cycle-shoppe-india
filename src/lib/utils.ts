
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
      repeatType: "mirror" as const,
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
      repeatType: "mirror" as const,
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
      repeatType: "loop" as const,
      ease: "easeInOut",
    },
  },
}

// Shimmer effect animation
export const shimmerAnimation = {
  initial: { 
    backgroundPosition: "-200% 0",
    opacity: 0.5,
  },
  animate: {
    backgroundPosition: "200% 0",
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror" as const,
      duration: 3,
      ease: "linear",
    },
  },
}

// Bounce animation
export const bounceAnimation = {
  initial: {},
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeOut",
    },
  },
}

// Wave animation for text
export const waveTextAnimation = (delay = 0) => ({
  initial: {},
  animate: {
    transition: {
      delayChildren: delay,
      staggerChildren: 0.04,
    },
  },
})

export const waveCharAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-8, 0, 8, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "loop" as const,
      ease: "easeInOut",
    },
  },
}

// 3D tilt effect
export const tilt3DEffect = {
  rest: { 
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  hover: { 
    scale: 1.02,
    rotateX: 5,
    rotateY: 10,
    transition: { duration: 0.4, ease: "easeOut" }
  }
}
