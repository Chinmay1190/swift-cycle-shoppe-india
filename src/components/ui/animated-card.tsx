
import React, { useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface AnimatedCardProps extends Omit<HTMLMotionProps<"div">, "onDrag"> {
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
  
  const cardMotion = {
    rest: { 
      scale: 1, 
      boxShadow: "0px 0px 0px rgba(0,0,0,0.1)",
      y: 0
    },
    hover: { 
      scale: variant === "hover3d" ? 1 : 1.02, 
      boxShadow: "0px 5px 10px rgba(0,0,0,0.15)",
      y: -5
    }
  };
  
  const imageMotion = {
    rest: { scale: 1 },
    hover: { scale: 1.05 }
  };
  
  return (
    <motion.div
      className={cn("relative", getVariantClass(), className)}
      initial="rest"
      whileHover="hover"
      animate={hovered ? "hover" : "rest"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      variants={cardMotion}
      transition={{ duration: 0.3, ease: "easeOut" }}
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
              variants={imageMotion}
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
