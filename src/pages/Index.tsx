
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import FeaturedProducts from "@/components/FeaturedProducts";
import products from "@/data/products";
import { motion } from "framer-motion";
import { AnimatedCarousel } from "@/components/ui/carousel-animated";
import { staggerContainer, fadeUpVariant, fadeInScale } from "@/lib/utils";

const heroImages = [
  "https://cdn.pixabay.com/photo/2016/04/07/06/53/bmw-1313343_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/04/25/07/15/man-1351317_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/07/05/08/30/motorcycle-racing-384613_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/09/08/21/02/superbike-930715_1280.jpg"
];

// Fixed animation variants with proper repeatType values
const floatingAnimation = {
  initial: {},
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "mirror" as const, // Using "as const" to ensure correct type
      ease: "easeInOut"
    }
  }
};

// Fixed pulse animation variant
const pulseAnimation = {
  initial: {},
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "mirror" as const, // Using "as const" to ensure correct type
      ease: "easeInOut"
    }
  }
};

const Index = () => {
  return (
    <Layout>
      {/* Hero Section with Animated Carousel */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0">
          <AnimatedCarousel 
            images={heroImages}
            aspectRatio={16/9}
            className="w-full h-full"
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="container mx-auto px-4 py-28 md:py-36 lg:py-48 relative z-10">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer(0.2)}
            className="max-w-3xl"
          >
            <motion.h1 
              variants={fadeUpVariant}
              className="text-4xl md:text-6xl font-bold mb-6 [text-shadow:_0_2px_10px_rgba(0,0,0,0.5)]"
            >
              Experience the Ultimate Thrill of Superbikes
            </motion.h1>
            <motion.p 
              variants={fadeUpVariant}
              className="text-xl mb-8 text-gray-200 max-w-lg [text-shadow:_0_2px_5px_rgba(0,0,0,0.5)]"
            >
              Discover premium motorcycles built for those who demand excellence
              and crave adventure on two wheels.
            </motion.p>
            <motion.div 
              variants={fadeUpVariant} 
              className="flex flex-wrap gap-4"
            >
              <Button asChild size="lg" className="bg-primary/90 backdrop-blur-sm hover:bg-primary transition-all hover:scale-105">
                <Link to="/products">Explore Collection</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all hover:scale-105">
                <Link to="/about">Learn More</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated bike silhouette with better animation */}
        <motion.div
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
          className="absolute bottom-0 right-0 w-1/2 md:w-1/3 h-24 md:h-32 opacity-20"
        >
          <div className="w-24 h-12 bg-white/30 rounded-full absolute bottom-0 blur-md"></div>
          <svg
            className="w-full h-full"
            viewBox="0 0 100 50"
            fill="white"
          >
            <path d="M85,30c-0.3,0-0.7,0-1,0.1c-1.5-3.8-5.3-6.1-9.5-6.1c-0.3,0-0.7,0-1,0.1C72,18.2,66.2,14,60,14c-7.7,0-14,6.3-14,14 c0,0.3,0,0.7,0.1,1H20c-5.5,0-10,4.5-10,10s4.5,10,10,10h65c8.3,0,15-6.7,15-15S93.3,30,85,30z" />
          </svg>
        </motion.div>
      </section>

      {/* Brand Logos with subtle animations */}
      <section className="py-12 bg-muted/30 overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {["Kawasaki", "Yamaha", "Honda", "Ducati", "BMW", "Suzuki"].map(
              (brand, index) => (
                <motion.div
                  key={brand}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, color: "var(--primary)" }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold text-muted-foreground/70"
                >
                  {brand}
                </motion.div>
              )
            )}
          </div>
        </div>
        
        {/* Background animated shapes */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts products={products} />

      {/* Categories Section with enhanced animations */}
      <section className="py-16 px-4 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Browse By Category
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our vast collection of motorcycles by category to find the
              perfect ride for your style and needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sport",
                desc: "Built for speed and performance",
                img: "https://cdn.pixabay.com/photo/2015/03/26/10/02/motorcycle-691104_1280.jpg"
              },
              {
                name: "Naked",
                desc: "Pure riding experience with minimal fairings",
                img: "https://cdn.pixabay.com/photo/2016/04/13/20/36/motorcycle-1327564_1280.jpg"
              },
              {
                name: "Adventure",
                desc: "Designed for on and off-road adventures",
                img: "https://cdn.pixabay.com/photo/2017/08/01/10/35/suzuki-2564605_1280.jpg"
              }
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-lg group shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                
                <img
                  src={category.img}
                  alt={category.name}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/80 mb-4">
                    {category.desc}
                  </p>
                  <Button
                    asChild
                    variant="default"
                    className="w-fit group-hover:bg-primary group-hover:scale-105 transition-all duration-300"
                  >
                    <Link to={`/products?category=${category.name}`}>Explore</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </section>

      {/* Testimonials with enhanced designs */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-muted/30 to-transparent" />
        
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from riders who have experienced the passion and performance
              of our superbikes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Vikram Singh",
                role: "Professional Racer",
                comment:
                  "The performance of my Kawasaki Ninja ZX-10R exceeds all expectations. The handling is precise, and the power delivery is smooth and linear. It's simply the best bike I've ever ridden.",
              },
              {
                name: "Ananya Sharma",
                role: "Weekend Rider",
                comment:
                  "My Ducati Monster is not just a motorcycle; it's my escape from the daily grind. The customer service I received was outstanding, and the bike is everything I dreamed of and more.",
              },
              {
                name: "Rahul Mehta",
                role: "Motorcycle Enthusiast",
                comment:
                  "The BMW S1000RR I purchased is a technological marvel. From the quickshifter to the electronic suspension, everything works together perfectly. Superb machine and excellent buying experience.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0,0,0,0.1)" }}
                viewport={{ once: true }}
                className="bg-card p-6 rounded-lg shadow-sm border border-border/50 backdrop-blur-sm"
              >
                <div className="relative">
                  <svg 
                    className="absolute top-0 left-0 w-12 h-12 text-primary/10 -mt-6 -ml-4" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  
                  <div className="mb-4 ml-6">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 inline-block text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.comment}"
                </p>
                
                <div className="flex items-center">
                  <motion.div
                    variants={pulseAnimation}
                    initial="initial"
                    animate="animate" 
                    className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold"
                  >
                    {testimonial.name[0]}
                  </motion.div>
                  <div className="ml-3">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter with enhanced design */}
      <section className="py-16 px-4 bg-gradient-to-b from-muted/10 via-muted/30 to-muted/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-gradient-to-br from-primary/5 to-primary/20 backdrop-blur-md p-8 md:p-12 border border-primary/10 shadow-xl"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="md:w-2/3">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Join Our Newsletter
                </h3>
                <p className="text-muted-foreground">
                  Subscribe to get special offers, exclusive discounts, and
                  updates about our latest superbikes.
                </p>
              </div>
              <div className="md:w-1/3">
                <form className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary flex-grow"
                  />
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button type="submit" className="bg-primary hover:bg-primary/90">Subscribe</Button>
                  </motion.div>
                </form>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
