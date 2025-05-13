
import { useState, useEffect } from 'react';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { motion } from 'framer-motion';

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  const [activeTab, setActiveTab] = useState('featured');
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);

  useEffect(() => {
    let filtered: Product[];
    
    switch (activeTab) {
      case 'featured':
        filtered = products.filter(product => product.featured);
        break;
      case 'new':
        filtered = products.filter(product => product.new);
        break;
      case 'sale':
        filtered = products.filter(product => product.onSale);
        break;
      default:
        filtered = products.filter(product => product.featured);
    }
    
    setDisplayProducts(filtered.slice(0, 8));
  }, [activeTab, products]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Superbikes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our collection of premium motorcycles that redefine power, speed, and elegance.
          </p>
        </motion.div>
        
        <Tabs defaultValue="featured" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex justify-center mb-8">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="new">New Arrivals</TabsTrigger>
            <TabsTrigger value="sale">On Sale</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-8">
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {displayProducts.map((product, index) => (
                <motion.div key={product.id} variants={item}>
                  <ProductCard product={product} delay={index} />
                </motion.div>
              ))}
            </motion.div>
            
            <div className="flex justify-center mt-8">
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <a href="/products">View All Products</a>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturedProducts;
