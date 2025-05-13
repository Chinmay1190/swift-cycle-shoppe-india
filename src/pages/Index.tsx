
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import FeaturedProducts from "@/components/FeaturedProducts";
import products from "@/data/products";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://cdn.pixabay.com/photo/2016/04/07/06/53/bmw-1313343_1280.jpg"
            alt="Superbike"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="container mx-auto px-4 py-28 md:py-36 lg:py-48 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Experience the Ultimate Thrill of Superbikes
            </h1>
            <p className="text-xl mb-8 text-gray-200 max-w-lg">
              Discover premium motorcycles built for those who demand excellence
              and crave adventure on two wheels.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/products">Explore Collection</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Animated bike silhouette */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-0 right-0 w-1/2 md:w-1/3 h-24 md:h-32 opacity-20"
        >
          <div className="w-24 h-12 bg-white/30 rounded-full absolute bottom-0 blur-md animate-bike-ride"></div>
          <svg
            className="w-full h-full animate-bike-ride"
            viewBox="0 0 100 50"
            fill="white"
          >
            <path d="M85,30c-0.3,0-0.7,0-1,0.1c-1.5-3.8-5.3-6.1-9.5-6.1c-0.3,0-0.7,0-1,0.1C72,18.2,66.2,14,60,14c-7.7,0-14,6.3-14,14 c0,0.3,0,0.7,0.1,1H20c-5.5,0-10,4.5-10,10s4.5,10,10,10h65c8.3,0,15-6.7,15-15S93.3,30,85,30z" />
          </svg>
        </motion.div>
      </section>

      {/* Brand Logos */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {["Kawasaki", "Yamaha", "Honda", "Ducati", "BMW", "Suzuki"].map(
              (brand) => (
                <motion.div
                  key={brand}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-2xl font-bold text-muted-foreground/70"
                >
                  {brand}
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts products={products} />

      {/* Categories Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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
            {["Sport", "Naked", "Adventure"].map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-lg group"
              >
                <img
                  src={`https://cdn.pixabay.com/photo/201${5 + index}/0${
                    3 + index
                  }/27/17/59/vintage-1283299_1280.jpg`}
                  alt={category}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category}
                  </h3>
                  <p className="text-white/80 mb-4">
                    {category === "Sport"
                      ? "Built for speed and performance"
                      : category === "Naked"
                      ? "Pure riding experience with minimal fairings"
                      : "Designed for on and off-road adventures"}
                  </p>
                  <Button
                    asChild
                    variant="default"
                    className="w-fit group-hover:bg-primary transition-colors"
                  >
                    <Link to={`/products?category=${category}`}>Explore</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-6 rounded-lg shadow-sm border"
              >
                <div className="mb-4">
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
                <p className="text-muted-foreground mb-4">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                    {testimonial.name[0]}
                  </div>
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

      {/* Newsletter */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="rounded-2xl bg-primary/10 p-8 md:p-12">
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
                  <Button type="submit">Subscribe</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
