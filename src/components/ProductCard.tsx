
import { Product } from "@/data/products";
import { formatPrice } from "@/utils/formatters";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: Product;
  delay?: number;
}

const ProductCard = ({ product, delay = 0 }: ProductCardProps) => {
  const { name, brand, price, image, rating, onSale, salePrice, new: isNew } = product;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay * 0.1 }}
      className="group overflow-hidden rounded-lg border bg-card text-card-foreground shadow hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      <Link to={`/products/${product.id}`}>
        <div className="overflow-hidden h-48 lg:h-64 relative">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {onSale && (
              <Badge className="bg-primary hover:bg-primary text-white">
                Sale
              </Badge>
            )}
            {isNew && (
              <Badge variant="outline" className="border-white text-white bg-black/30 backdrop-blur-sm">
                New
              </Badge>
            )}
          </div>
        </div>
      </Link>
      
      <div className="flex flex-col flex-grow p-4">
        <div className="flex-grow">
          <p className="text-sm font-medium text-muted-foreground">{brand}</p>
          <Link to={`/products/${product.id}`}>
            <h3 className="font-semibold mt-1 text-lg group-hover:text-primary transition-colors duration-300">{name}</h3>
          </Link>
          
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-xs text-muted-foreground">{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div>
            {onSale && salePrice ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary">{formatPrice(salePrice)}</span>
                <span className="text-sm text-muted-foreground line-through">{formatPrice(price)}</span>
              </div>
            ) : (
              <span className="text-lg font-bold">{formatPrice(price)}</span>
            )}
          </div>
          
          <Link to={`/products/${product.id}`}>
            <Badge variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white transition-colors">
              View
            </Badge>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
