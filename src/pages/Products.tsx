
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import products from '@/data/products';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/utils/formatters';
import { motion } from 'framer-motion';

const MAX_PRICE = 3000000;

const ProductsPage = () => {
  const { search } = useLocation();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, MAX_PRICE]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique brands and categories from products data
  const brands = [...new Set(products.map(product => product.brand))].sort();
  const categories = [...new Set(products.map(product => product.category))].sort();

  useEffect(() => {
    // Parse URL query parameters
    const params = new URLSearchParams(search);
    const categoryParam = params.get('category');
    
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [search]);

  useEffect(() => {
    // Apply all filters
    let result = [...products];
    
    // Search filter
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Brand filter
    if (selectedBrands.length > 0) {
      result = result.filter(product => selectedBrands.includes(product.brand));
    }
    
    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category));
    }
    
    // Price range filter
    result = result.filter(product => {
      const effectivePrice = product.onSale && product.salePrice ? product.salePrice : product.price;
      return effectivePrice >= priceRange[0] && effectivePrice <= priceRange[1];
    });
    
    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => {
          const priceA = a.onSale && a.salePrice ? a.salePrice : a.price;
          const priceB = b.onSale && b.salePrice ? b.salePrice : b.price;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        result.sort((a, b) => {
          const priceA = a.onSale && a.salePrice ? a.salePrice : a.price;
          const priceB = b.onSale && b.salePrice ? b.salePrice : b.price;
          return priceB - priceA;
        });
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result = result.filter(product => product.new).concat(result.filter(product => !product.new));
        break;
      case 'featured':
      default:
        result = result.filter(product => product.featured).concat(result.filter(product => !product.featured));
    }
    
    setFilteredProducts(result);
  }, [searchQuery, selectedBrands, selectedCategories, priceRange, sortBy, search]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange([0, MAX_PRICE]);
    setSortBy('featured');
  };

  return (
    <Layout>
      <section className="py-8 md:py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters - Mobile Toggle */}
            <div className="md:hidden mb-4">
              <Button 
                onClick={() => setShowFilters(!showFilters)} 
                variant="outline" 
                className="w-full"
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
            
            {/* Filters Sidebar */}
            <aside 
              className={`w-full md:w-64 flex-shrink-0 space-y-8 ${showFilters ? 'block' : 'hidden'} md:block`}
            >
              <div className="p-4 border rounded-lg bg-card">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                
                {/* Search */}
                <div className="mb-6">
                  <Label htmlFor="search" className="mb-2 block">Search</Label>
                  <Input
                    id="search"
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {/* Brands */}
                <div className="mb-6">
                  <h3 className="text-md font-medium mb-2">Brand</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center gap-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => handleBrandChange(brand)}
                        />
                        <Label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="text-md font-medium mb-2">Category</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center gap-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryChange(category)}
                        />
                        <Label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="text-md font-medium mb-2">Price Range</h3>
                  <div className="mt-6 px-2">
                    <Slider
                      defaultValue={[0, MAX_PRICE]}
                      max={MAX_PRICE}
                      step={50000}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value)}
                      className="mt-2"
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
                
                <Button onClick={resetFilters} variant="outline" size="sm" className="w-full">
                  Reset Filters
                </Button>
              </div>
            </aside>
            
            {/* Main Content */}
            <div className="flex-1">
              {/* Header and Sort */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold">All Superbikes</h1>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Label htmlFor="sort-by" className="whitespace-nowrap">Sort by:</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger id="sort-by" className="w-full sm:w-[200px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Results count */}
              <p className="text-muted-foreground mb-6">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
              
              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <motion.div 
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} delay={index % 12} />
                  ))}
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-muted/30">
                  <p className="text-lg font-medium mb-3">No products found</p>
                  <p className="text-muted-foreground text-center mb-4">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                  <Button onClick={resetFilters} variant="default">Reset Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductsPage;
