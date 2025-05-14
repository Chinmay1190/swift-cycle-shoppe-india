
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const AspectRatio = AspectRatioPrimitive.Root

// Create a motion-enhanced version for animations
const MotionAspectRatio = motion(AspectRatio)

export { AspectRatio, MotionAspectRatio }
