
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  backgroundImage?: string;
  overlayColor?: string;
  backgroundPosition?: string;
  children: React.ReactNode;
  parallaxStrength?: number;
  className?: string;
}

export function ParallaxSection({
  backgroundImage,
  overlayColor = "rgba(0, 0, 0, 0.4)",
  backgroundPosition = "center",
  parallaxStrength = 0.3,
  className,
  children,
  ...props
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    if (sectionRef.current) {
      setElementTop(sectionRef.current.offsetTop);
    }
  }, []);

  const y = useTransform(
    scrollY,
    [elementTop - 500, elementTop + 500],
    [-parallaxStrength * 100, parallaxStrength * 100]
  );

  return (
    <section 
      ref={sectionRef}
      className={cn(
        "relative overflow-hidden",
        className
      )}
      {...props}
    >
      {backgroundImage && (
        <motion.div
          style={{
            y,
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition,
            backgroundSize: 'cover',
          }}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        />
      )}
      
      {overlayColor && (
        <div 
          className="absolute inset-0 z-0"
          style={{ backgroundColor: overlayColor }}
        />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}
