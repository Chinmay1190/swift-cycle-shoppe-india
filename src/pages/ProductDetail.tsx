
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import products, { Product } from "@/data/products";
import { formatPrice } from "@/utils/formatters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    product?.colors[0] || "Default"
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Find related products
  const relatedProducts = products
    .filter(
      (p) =>
        p.category === product?.category && p.id !== product?.id
    )
    .slice(0, 4);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-6">
              Sorry, the product you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate("/products")}>
              Browse All Products
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 md:py-12 px-4">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* Product Images */}
          <div className="lg:w-1/2 space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square bg-muted rounded-lg overflow-hidden"
            >
              <img
                src={activeImageIndex === 0 ? product.image : product.gallery[activeImageIndex - 1]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.onSale && (
                  <Badge className="bg-primary hover:bg-primary text-white">
                    Sale
                  </Badge>
                )}
                {product.new && (
                  <Badge variant="outline" className="border-white text-white bg-black/30 backdrop-blur-sm">
                    New
                  </Badge>
                )}
              </div>
            </motion.div>
            
            <div className="flex space-x-2 overflow-auto pb-2">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveImageIndex(0)}
                className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${
                  activeImageIndex === 0 ? "border-primary" : "border-transparent"
                }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </motion.button>
              
              {product.gallery.map((img, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: (index + 1) * 0.1 }}
                  onClick={() => setActiveImageIndex(index + 1)}
                  className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${
                    activeImageIndex === index + 1
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="lg:w-1/2">
            <div className="mb-2">
              <Badge variant="outline" className="mb-2">
                {product.category}
              </Badge>
              <Badge variant="secondary" className="ml-2">
                {product.brand}
              </Badge>
            </div>
            
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-2"
            >
              {product.name}
            </motion.h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-sm text-muted-foreground">
                  {product.rating.toFixed(1)} Rating
                </span>
              </div>
              
              <p className="ml-4 text-sm text-muted-foreground">
                {product.stock > 0 ? (
                  product.stock < 5 ? (
                    <span className="text-amber-500">Only {product.stock} left in stock</span>
                  ) : (
                    <span className="text-green-600">In Stock</span>
                  )
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </p>
            </div>
            
            <div className="mb-6">
              {product.onSale && product.salePrice ? (
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(product.salePrice)}
                  </span>
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                  <Badge className="ml-2 bg-primary text-white">
                    {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
                  </Badge>
                </div>
              ) : (
                <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
              )}
              <p className="text-sm text-muted-foreground mt-1">
                Includes taxes and all applicable fees
              </p>
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground mb-6"
            >
              {product.description}
            </motion.p>
            
            <div className="space-y-6">
              {/* Color Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1 rounded-md border ${
                        selectedColor === color
                          ? "border-primary bg-primary/10"
                          : "border-muted"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Quantity
                </label>
                <Select
                  value={quantity.toString()}
                  onValueChange={(val) => setQuantity(Number(val))}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="1" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(Math.min(product.stock, 5))].map((_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-grow"
                  size="lg"
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="secondary"
                  className="flex-grow"
                  size="lg"
                  onClick={() => {
                    addToCart(product, quantity, selectedColor);
                    navigate('/cart');
                  }}
                  disabled={product.stock === 0}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="specs">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specs" className="mt-6">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-b pb-2">
                    <p className="text-sm text-muted-foreground">Engine</p>
                    <p>{product.specs.engine}</p>
                  </div>
                  <div className="border-b pb-2">
                    <p className="text-sm text-muted-foreground">Power</p>
                    <p>{product.specs.power}</p>
                  </div>
                  <div className="border-b pb-2">
                    <p className="text-sm text-muted-foreground">Torque</p>
                    <p>{product.specs.torque}</p>
                  </div>
                  <div className="border-b pb-2">
                    <p className="text-sm text-muted-foreground">Transmission</p>
                    <p>{product.specs.transmission}</p>
                  </div>
                  <div className="border-b pb-2">
                    <p className="text-sm text-muted-foreground">Weight</p>
                    <p>{product.specs.weight}</p>
                  </div>
                  <div className="border-b pb-2">
                    <p className="text-sm text-muted-foreground">Top Speed</p>
                    <p>{product.specs.topSpeed}</p>
                  </div>
                  <div className="border-b pb-2">
                    <p className="text-sm text-muted-foreground">Fuel Capacity</p>
                    <p>{product.specs.fuelCapacity}</p>
                  </div>
                  <div className="border-b pb-2">
                    <p className="text-sm text-muted-foreground">Mileage</p>
                    <p>{product.specs.mileage}</p>
                  </div>
                  <div className="border-b pb-2">
                    <p className="text-sm text-muted-foreground">ABS</p>
                    <p>{product.specs.abs ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="features" className="mt-6">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Advanced electronic rider aids including multiple riding modes
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    High-performance suspension system for optimal handling
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Lightweight chassis for improved agility
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    LED lighting system for enhanced visibility
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Digital instrument cluster with smartphone connectivity
                  </li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-6">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Shipping & Delivery</h3>
                <div className="space-y-4">
                  <p>
                    We offer safe and secure shipping for all our motorcycles across India.
                    Each motorcycle is carefully prepared, inspected, and transported to ensure 
                    it arrives in perfect condition.
                  </p>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Delivery Times</h4>
                    <p>
                      - Metro Cities: 3-7 business days<br />
                      - Other Urban Areas: 7-14 business days<br />
                      - Rural Areas: 10-21 business days
                    </p>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Shipping Fee</h4>
                    <p>
                      Shipping costs are calculated based on your location. For most metro cities, 
                      we offer free delivery on this model.
                    </p>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Tracking</h4>
                    <p>
                      Once your order is shipped, you'll receive a tracking number to monitor 
                      the progress of your delivery.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} delay={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
