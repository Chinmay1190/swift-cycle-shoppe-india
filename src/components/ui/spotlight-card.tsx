
import { useState, useRef, useCallback } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends Omit<HTMLMotionProps<"div">, "onMouseMove" | "onMouseLeave"> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  glowIntensity?: number;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "255, 255, 255",
  glowIntensity = 0.3,
  ...props
}: SpotlightCardProps) {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setPosition({ x, y });
      setOpacity(1);
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-xl bg-card border border-border/40 transition-all duration-300",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
      {...props}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(${spotlightColor}, ${glowIntensity}), transparent)`,
          opacity,
          transition: "opacity 0.2s"
        }}
      />
      {children}
    </motion.div>
  );
}
