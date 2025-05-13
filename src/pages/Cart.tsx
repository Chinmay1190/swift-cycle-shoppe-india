
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/formatters';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const CartPage = () => {
  const { items, totalItems, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  
  const shipping = 10000;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;
  
  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'SUPER10') {
      toast.success('Coupon applied: 10% discount');
    } else {
      toast.error('Invalid coupon code');
    }
  };
  
  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4 text-center">
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
          <div className="max-w-md mx-auto p-6 border rounded-lg bg-card">
            <p className="mb-6">Your cart is empty.</p>
            <Button asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            {/* Cart Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-2 mb-4 border-b text-sm font-semibold text-muted-foreground">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            {/* Cart Items */}
            <div className="space-y-6">
              {items.map((item) => {
                const itemPrice = item.product.onSale && item.product.salePrice ? item.product.salePrice : item.product.price;
                const itemTotal = itemPrice * item.quantity;
                
                return (
                  <div key={`${item.product.id}-${item.color}`} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 border-b">
                    {/* Product Info */}
                    <div className="col-span-1 md:col-span-6">
                      <div className="flex items-center space-x-4">
                        <Link to={`/products/${item.product.id}`} className="flex-shrink-0 w-20 h-20">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </Link>
                        <div>
                          <Link to={`/products/${item.product.id}`} className="font-semibold hover:text-primary">
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {item.product.brand} | Color: {item.color}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-sm text-red-500 hover:text-red-700 mt-2 md:hidden"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="col-span-1 md:col-span-2 flex md:block items-center justify-between">
                      <span className="md:hidden text-muted-foreground">Price:</span>
                      <div className="md:text-center">
                        {item.product.onSale && item.product.salePrice ? (
                          <>
                            <span className="font-semibold">{formatPrice(item.product.salePrice)}</span>
                            <span className="text-sm text-muted-foreground line-through block">
                              {formatPrice(item.product.price)}
                            </span>
                          </>
                        ) : (
                          <span className="font-semibold">{formatPrice(itemPrice)}</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Quantity */}
                    <div className="col-span-1 md:col-span-2 flex md:justify-center items-center">
                      <span className="md:hidden mr-2 text-muted-foreground">Quantity:</span>
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 border rounded-l flex items-center justify-center disabled:opacity-50"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="w-10 h-8 border-t border-b text-center text-sm"
                        />
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="w-8 h-8 border rounded-r flex items-center justify-center disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    {/* Total */}
                    <div className="col-span-1 md:col-span-2 flex md:block items-center justify-between">
                      <span className="md:hidden text-muted-foreground">Subtotal:</span>
                      <div className="md:text-right font-semibold">
                        {formatPrice(itemTotal)}
                      </div>
                    </div>
                    
                    {/* Remove - Desktop */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-sm text-red-500 hover:text-red-700 hidden md:block md:col-span-12 text-right"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
            
            {/* Cart Actions */}
            <div className="flex flex-wrap justify-between gap-4 mt-6">
              <Button asChild variant="outline">
                <Link to="/products">Continue Shopping</Link>
              </Button>
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="border rounded-lg p-6 bg-card sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-2 border-b pb-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (18%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
              </div>
              
              {/* Coupon */}
              <div className="mb-6">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleApplyCoupon}>Apply</Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Try SUPER10 for 10% off</p>
              </div>
              
              <div className="flex justify-between font-semibold text-lg border-t pt-4 mb-6">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              
              <Button
                onClick={() => navigate('/checkout')}
                className="w-full"
                size="lg"
              >
                Proceed to Checkout
              </Button>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                By proceeding, you agree to our Terms & Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
