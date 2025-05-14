
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function AnimatedCounter({ 
  from = 0, 
  to, 
  duration = 2, 
  className,
  prefix = "",
  suffix = "",
  decimals = 0
}: AnimatedCounterProps) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (value) => {
    return value.toFixed(decimals);
  });
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (isInView) {
      animate(count, to, { duration });
    }
  }, [count, to, duration, isInView]);

  return (
    <motion.div
      className={cn("font-bold", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      onViewportEnter={() => setIsInView(true)}
    >
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.div>
  );
}
