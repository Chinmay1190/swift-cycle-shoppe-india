
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  image?: string;
  footer?: React.ReactNode;
  variant?: "default" | "hover3d" | "glassmorphic" | "bordered" | "minimal";
  imageAspectRatio?: "auto" | "square" | "video" | "wide";
}

export function AnimatedCard({
  title,
  description,
  image,
  footer,
  variant = "default",
  imageAspectRatio = "auto",
  className,
  children,
  ...props
}: AnimatedCardProps) {
  const [hovered, setHovered] = useState(false);
  
  const getAspectRatioClass = () => {
    switch (imageAspectRatio) {
      case "square": return "aspect-square";
      case "video": return "aspect-video";
      case "wide": return "aspect-[21/9]";
      default: return "";
    }
  };
  
  const getVariantClass = () => {
    switch (variant) {
      case "hover3d": return "overflow-hidden rounded-xl";
      case "glassmorphic": return "glass-morphism border-opacity-20";
      case "bordered": return "border-2 border-primary";
      case "minimal": return "border-0 shadow-none bg-transparent";
      default: return "";
    }
  };
  
  return (
    <motion.div
      className={cn("relative", getVariantClass(), className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: variant === "hover3d" ? 1 : 1.02, 
        y: -5,
        boxShadow: "0px 5px 10px rgba(0,0,0,0.15)"
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      <Card className={cn(
        "border h-full overflow-hidden", 
        variant === "glassmorphic" && "bg-white/30 dark:bg-black/30 backdrop-blur-md",
        variant === "minimal" && "border-0 shadow-none bg-transparent",
        variant === "hover3d" && "overflow-visible"
      )}>
        {image && (
          <div className={cn("overflow-hidden", getAspectRatioClass())}>
            <motion.div
              className="h-full w-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={image} 
                alt={title || "Card image"} 
                className="h-full w-full object-cover" 
              />
            </motion.div>
          </div>
        )}
        
        {(title || description) && (
          <CardHeader>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        
        {children && <CardContent>{children}</CardContent>}
        
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
      
      {variant === "hover3d" && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      )}
    </motion.div>
  );
}
