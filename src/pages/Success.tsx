
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

const SuccessPage = () => {
  useEffect(() => {
    // Trigger confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Order Successful!</h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          
          <div className="bg-card border rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Order Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="font-medium">#SUP{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</p>
              </div>
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <p className="font-medium">Credit Card (ending in 3456)</p>
              </div>
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Shipping Method</p>
                <p className="font-medium">Express Delivery</p>
              </div>
            </div>
          </div>
          
          <p className="mb-4">
            We've sent a confirmation email with all the details to your email address.
          </p>
          
          <p className="text-muted-foreground mb-8">
            If you have any questions about your order, please contact our customer support team.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/">Back to Home</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuccessPage;
