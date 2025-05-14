
import React, { useState, useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '@/components/ui/button';

interface MagneticButtonProps extends ButtonProps {
  strength?: number;
  radius?: number;
}

export function MagneticButton({
  strength = 25,
  radius = 200,
  className,
  children,
  ...props
}: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLButtonElement>(null);
  
  const handleMouse = (event: MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const { clientX, clientY } = event;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distanceFromCenterX = clientX - centerX;
      const distanceFromCenterY = clientY - centerY;
      
      const distance = Math.sqrt(
        distanceFromCenterX * distanceFromCenterX + 
        distanceFromCenterY * distanceFromCenterY
      );
      
      // Only apply the magnetic effect if the cursor is within the specified radius
      if (distance < radius) {
        const magneticPull = 1 - distance / radius;
        
        setPosition({ 
          x: distanceFromCenterX * magneticPull * strength / 10, 
          y: distanceFromCenterY * magneticPull * strength / 10
        });
      } else {
        resetPosition();
      }
    }
  };
  
  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
  };
  
  return (
    <div 
      className="relative inline-block"
      onMouseMove={handleMouse}
      onMouseLeave={resetPosition}
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.5 }}
      >
        <Button
          ref={ref}
          className={cn("transition-all duration-100", className)}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    </div>
  );
}
