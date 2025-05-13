
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://cdn.pixabay.com/photo/2019/07/07/14/03/fiat-4322521_1280.jpg"
            alt="Superbike"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 py-24 md:py-36 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Us</h1>
            <p className="text-xl mb-8 text-gray-200 max-w-2xl">
              We're passionate motorcycle enthusiasts dedicated to bringing the finest superbikes to riders across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://cdn.pixabay.com/photo/2015/09/09/00/04/motorcycle-931515_1280.jpg"
                alt="Our Story"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2010, SuperBikes began with a simple mission: to provide motorcycle enthusiasts with access to the world's finest superbikes right here in India.
                </p>
                <p>
                  What started as a small showroom in Mumbai has grown into a nationwide network of dealerships, service centers, and a thriving online marketplace.
                </p>
                <p>
                  Our founder, Raj Mehta, a former professional racer, built this company on the principles of quality, performance, and exceptional customer service. These values continue to guide everything we do today.
                </p>
              </div>
              
              <div className="mt-8">
                <Button asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core principles guide our business and ensure we deliver the best experience to our customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Performance",
                description: "We're obsessed with performance, both in the bikes we sell and the service we provide. We never settle for anything less than exceptional."
              },
              {
                icon: "🛠️",
                title: "Quality",
                description: "From the motorcycles on our showroom floor to our after-sales service, we maintain the highest standards of quality in everything we do."
              },
              {
                icon: "🤝",
                title: "Integrity",
                description: "Honesty, transparency, and fairness form the foundation of our relationships with customers, partners, and team members."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border rounded-lg p-6 text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the passionate motorcycle enthusiasts who make SuperBikes possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Raj Mehta",
                role: "Founder & CEO",
                image: "https://cdn.pixabay.com/photo/2018/09/06/18/26/person-3658927_1280.jpg"
              },
              {
                name: "Priya Singh",
                role: "Head of Operations",
                image: "https://cdn.pixabay.com/photo/2018/04/04/13/38/woman-3289814_1280.jpg"
              },
              {
                name: "Vikram Patel",
                role: "Chief Mechanic",
                image: "https://cdn.pixabay.com/photo/2018/02/21/08/40/woman-3169726_1280.jpg"
              },
              {
                name: "Ananya Sharma",
                role: "Customer Experience",
                image: "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card border rounded-lg overflow-hidden"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 px-4 bg-primary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience the Thrill?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Visit one of our showrooms or browse our online collection to find your perfect superbike.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/products">Explore Collection</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
