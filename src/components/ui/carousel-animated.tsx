
import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselProps = {
  images: string[];
  autoPlayInterval?: number;
  className?: string;
  aspectRatio?: number;
  animationType?: "slide" | "fade" | "zoom" | "flip";
};

export function AnimatedCarousel({
  images,
  autoPlayInterval = 5000,
  className,
  aspectRatio = 16 / 9,
  animationType = "slide",
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  // Effect for auto-play functionality
  React.useEffect(() => {
    if (!autoPlayInterval || isPaused) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoPlayInterval);
    
    return () => clearInterval(interval);
  }, [images.length, autoPlayInterval, isPaused]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Animation variants based on type
  const getVariants = () => {
    switch(animationType) {
      case "slide":
        return {
          enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
          }),
          center: {
            x: 0,
            opacity: 1,
          },
          exit: (direction: number) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
          }),
        };
      case "fade":
        return {
          enter: { opacity: 0 },
          center: { opacity: 1 },
          exit: { opacity: 0 },
        };
      case "zoom":
        return {
          enter: { opacity: 0, scale: 1.2 },
          center: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.8 },
        };
      case "flip":
        return {
          enter: (direction: number) => ({
            opacity: 0,
            rotateY: direction > 0 ? 90 : -90,
          }),
          center: {
            opacity: 1,
            rotateY: 0,
          },
          exit: (direction: number) => ({
            opacity: 0,
            rotateY: direction < 0 ? 90 : -90,
          }),
        };
      default:
        return {
          enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
          }),
          center: {
            x: 0,
            opacity: 1,
          },
          exit: (direction: number) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
          }),
        };
    }
  };

  const variants = getVariants();

  // Transition settings based on animation type
  const getTransition = () => {
    const baseTransition = {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 },
    };

    switch(animationType) {
      case "zoom":
        return {
          ...baseTransition,
          scale: { type: "spring", stiffness: 200, damping: 30 },
        };
      case "flip":
        return {
          ...baseTransition,
          rotateY: { type: "spring", stiffness: 200, damping: 30 },
        };
      default:
        return baseTransition;
    }
  };

  return (
    <div 
      className={cn("relative overflow-hidden rounded-xl", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AspectRatio ratio={aspectRatio} className="bg-muted">
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.img
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={getTransition()}
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="absolute inset-0 h-full w-full object-cover"
            draggable="false"
          />
        </AnimatePresence>
      </AspectRatio>

      {/* Navigation buttons with enhanced hover effects */}
      <motion.button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all"
        whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.5)" }}
        whileTap={{ scale: 0.95 }}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </motion.button>
      
      <motion.button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all"
        whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.5)" }}
        whileTap={{ scale: 0.95 }}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </motion.button>

      {/* Enhanced indicators with animations */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2">
        {images.map((_, index) => (
          <motion.button
            key={index}
            className={`h-2 rounded-full transition-all ${
              currentIndex === index 
                ? "w-6 bg-white" 
                : "w-2 bg-white/50"
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Play/Pause indicator */}
      {isPaused && (
        <div className="absolute top-4 right-4 z-10 rounded-full bg-black/30 px-3 py-1 text-xs text-white backdrop-blur-sm">
          Paused
        </div>
      )}
    </div>
  );
}
