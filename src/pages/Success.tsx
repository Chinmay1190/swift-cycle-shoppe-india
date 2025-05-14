
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

const SuccessPage = () => {
  useEffect(() => {
    // Trigger multiple confetti animations for a more festive effect
    const launchConfetti = () => {
      // Standard celebration pattern
      const count = 200;
      const defaults = { 
        startVelocity: 30,
        spread: 360, 
        ticks: 60, 
        zIndex: 0,
        shapes: ['circle', 'square']
      };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      // Confetti from all corners
      const corners = [
        { x: 0.1, y: 0.1 },
        { x: 0.9, y: 0.1 },
        { x: 0.1, y: 0.9 },
        { x: 0.9, y: 0.9 }
      ];

      corners.forEach(corner => {
        confetti({
          ...defaults,
          particleCount: count / 4,
          origin: corner
        });
      });

      // Center burst
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5, x: 0.5 },
        gravity: 0.5,
        colors: ['#ff0000', '#ff7700', '#ffff00', '#00ff00', '#0000ff', '#8a2be2', '#ff00ff'],
        shapes: ['star', 'circle'],
      });

      // Side showers
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#e63946', '#f1faee', '#a8dadc', '#457b9d', '#1d3557'],
        });
        
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#e63946', '#f1faee', '#a8dadc', '#457b9d', '#1d3557'],
        });
      }, 500);
    };

    // Initial confetti
    launchConfetti();

    // Re-trigger confetti every few seconds for continuous celebration
    const interval = setInterval(() => {
      launchConfetti();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Animation variants for the elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: { repeat: Infinity, duration: 2 }
    }
  };

  const rotateVariants = {
    rotate: {
      rotate: [0, 10, 0, -10, 0],
      transition: { repeat: Infinity, duration: 5, ease: "easeInOut" }
    }
  };

  return (
    <Layout>
      <motion.div 
        className="container mx-auto py-16 px-4 text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-2xl mx-auto">
          <motion.div 
            className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8"
            variants={pulseVariants}
            animate="pulse"
          >
            <motion.svg
              className="w-16 h-16 text-green-600"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              variants={rotateVariants}
              animate="rotate"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </motion.svg>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text"
            variants={itemVariants}
          >
            Order Successful!
          </motion.h1>
          
          <motion.div variants={itemVariants}>
            <motion.p 
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Thank you for your purchase. Your SuperBike is on its way to fuel your adventures!
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="bg-card border rounded-lg p-6 mb-8 shadow-lg"
            variants={itemVariants}
            whileHover={{ scale: 1.02, boxShadow: "0px 10px 20px rgba(0,0,0,0.15)" }}
          >
            <motion.h3 
              className="text-xl font-semibold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Order Details
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div 
                className="text-left p-3 rounded-md bg-background/50"
                variants={itemVariants}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary), 0.1)" }}
              >
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="font-medium">#SUP{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</p>
              </motion.div>
              <motion.div 
                className="text-left p-3 rounded-md bg-background/50"
                variants={itemVariants}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary), 0.1)" }}
              >
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{new Date().toLocaleDateString('en-IN')}</p>
              </motion.div>
              <motion.div 
                className="text-left p-3 rounded-md bg-background/50"
                variants={itemVariants}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary), 0.1)" }}
              >
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <p className="font-medium">Credit Card (ending in 3456)</p>
              </motion.div>
              <motion.div 
                className="text-left p-3 rounded-md bg-background/50"
                variants={itemVariants}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary), 0.1)" }}
              >
                <p className="text-sm text-muted-foreground">Shipping Method</p>
                <p className="font-medium">Express Delivery</p>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <motion.div 
                className="p-4 bg-primary/10 rounded-lg mb-4"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p className="text-primary font-medium">
                  We've sent a confirmation email with all the details to your email address.
                </p>
              </motion.div>
            </motion.div>
            
            <motion.p 
              className="text-muted-foreground mb-8"
              variants={itemVariants}
            >
              If you have any questions about your order, please contact our customer support team.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              variants={containerVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                <Button asChild size="lg" className="px-8">
                  <Link to="/">Back to Home</Link>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                <Button asChild variant="outline" size="lg" className="px-8">
                  <Link to="/products">Continue Shopping</Link>
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-8"
            >
              <p className="text-sm text-muted-foreground">
                Your SuperBike will arrive within 3-5 business days.
                <br />Track your order using the link in your email.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default SuccessPage;
