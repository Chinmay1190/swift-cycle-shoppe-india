
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/formatters';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Badge as BadgeIcon, CreditCard, Wallet, Phone, Building, CreditCard as CreditCardIcon } from 'lucide-react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [activeTab, setActiveTab] = useState<string>('address');
  const [loading, setLoading] = useState(false);
  
  const shipping = 10000;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    bankName: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate address form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone ||
        !formData.address || !formData.city || !formData.state || !formData.zipCode) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setActiveTab('payment');
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate payment method data
    if (paymentMethod === 'card' && (!formData.cardName || !formData.cardNumber || !formData.expiryDate || !formData.cvv)) {
      toast.error("Please fill in all payment details");
      return;
    } else if (paymentMethod === 'upi' && !formData.upiId) {
      toast.error("Please enter a valid UPI ID");
      return;
    } else if (paymentMethod === 'netbanking' && !formData.bankName) {
      toast.error("Please select a bank");
      return;
    } else if (paymentMethod === 'wallet' && !formData.phone) {
      toast.error("Please enter a valid mobile number");
      return;
    } else if (paymentMethod === 'cod') {
      // No validation needed for COD
    }
    
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      navigate('/success');
      setLoading(false);
    }, 2000);
  };
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  if (items.length === 0) {
    navigate('/products');
    return null;
  }

  // Card payment icon
  const PaymentIcons = {
    card: <CreditCardIcon className="w-5 h-5 mr-2" />,
    upi: <Phone className="w-5 h-5 mr-2" />,
    netbanking: <Building className="w-5 h-5 mr-2" />,
    wallet: <Wallet className="w-5 h-5 mr-2" />,
    cod: <BadgeIcon className="w-5 h-5 mr-2" />
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <div>
            <Badge className="bg-primary" variant="outline">
              <span className="flex items-center">
                <BadgeIcon className="mr-1 h-3 w-3" />
                Secure Checkout
              </span>
            </Badge>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="address">Shipping Address</TabsTrigger>
                <TabsTrigger value="payment" disabled={activeTab !== 'payment' && activeTab !== 'review'}>Payment</TabsTrigger>
              </TabsList>
              
              <TabsContent value="address" className="pt-6">
                <form onSubmit={handleAddressSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">PIN Code *</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button type="submit" size="lg">
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="payment" className="pt-6">
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-lg font-medium">Payment Method</Label>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {/* Card Payment */}
                      <div
                        className={`border rounded-lg p-4 flex items-center cursor-pointer transition-all ${
                          paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                        }`}
                        onClick={() => setPaymentMethod('card')}
                      >
                        <div className="w-5 h-5 rounded-full border mr-3 flex items-center justify-center">
                          {paymentMethod === 'card' && (
                            <div className="w-3 h-3 bg-primary rounded-full" />
                          )}
                        </div>
                        <div className="flex items-center">
                          <CreditCardIcon className="w-5 h-5 mr-2" />
                          <p className="font-medium">Credit/Debit Card</p>
                        </div>
                      </div>
                      
                      {/* UPI Payment */}
                      <div
                        className={`border rounded-lg p-4 flex items-center cursor-pointer transition-all ${
                          paymentMethod === 'upi' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                        }`}
                        onClick={() => setPaymentMethod('upi')}
                      >
                        <div className="w-5 h-5 rounded-full border mr-3 flex items-center justify-center">
                          {paymentMethod === 'upi' && (
                            <div className="w-3 h-3 bg-primary rounded-full" />
                          )}
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-5 h-5 mr-2" />
                          <p className="font-medium">UPI</p>
                        </div>
                      </div>
                      
                      {/* Net Banking */}
                      <div
                        className={`border rounded-lg p-4 flex items-center cursor-pointer transition-all ${
                          paymentMethod === 'netbanking' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                        }`}
                        onClick={() => setPaymentMethod('netbanking')}
                      >
                        <div className="w-5 h-5 rounded-full border mr-3 flex items-center justify-center">
                          {paymentMethod === 'netbanking' && (
                            <div className="w-3 h-3 bg-primary rounded-full" />
                          )}
                        </div>
                        <div className="flex items-center">
                          <Building className="w-5 h-5 mr-2" />
                          <p className="font-medium">Net Banking</p>
                        </div>
                      </div>
                      
                      {/* Mobile Wallet */}
                      <div
                        className={`border rounded-lg p-4 flex items-center cursor-pointer transition-all ${
                          paymentMethod === 'wallet' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                        }`}
                        onClick={() => setPaymentMethod('wallet')}
                      >
                        <div className="w-5 h-5 rounded-full border mr-3 flex items-center justify-center">
                          {paymentMethod === 'wallet' && (
                            <div className="w-3 h-3 bg-primary rounded-full" />
                          )}
                        </div>
                        <div className="flex items-center">
                          <Wallet className="w-5 h-5 mr-2" />
                          <p className="font-medium">Mobile Wallet</p>
                        </div>
                      </div>
                      
                      {/* Cash on Delivery */}
                      <div
                        className={`border rounded-lg p-4 flex items-center cursor-pointer transition-all ${
                          paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                        }`}
                        onClick={() => setPaymentMethod('cod')}
                      >
                        <div className="w-5 h-5 rounded-full border mr-3 flex items-center justify-center">
                          {paymentMethod === 'cod' && (
                            <div className="w-3 h-3 bg-primary rounded-full" />
                          )}
                        </div>
                        <div className="flex items-center">
                          <BadgeIcon className="w-5 h-5 mr-2" />
                          <p className="font-medium">Cash on Delivery</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Credit/Debit Card Payment Form */}
                  {paymentMethod === 'card' && (
                    <motion.div 
                      className="border rounded-lg p-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card *</Label>
                          <Input
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date *</Label>
                            <Input
                              id="expiryDate"
                              name="expiryDate"
                              placeholder="MM/YY"
                              value={formData.expiryDate}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              name="cvv"
                              type="password"
                              maxLength={3}
                              placeholder="123"
                              value={formData.cvv}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4 pt-4 border-t">
                        <div className="flex gap-2">
                          <img src="https://cdn-icons-png.flaticon.com/128/349/349221.png" alt="Visa" className="h-8" />
                          <img src="https://cdn-icons-png.flaticon.com/128/349/349228.png" alt="MasterCard" className="h-8" />
                          <img src="https://cdn-icons-png.flaticon.com/128/349/349230.png" alt="AmEx" className="h-8" />
                          <img src="https://cdn-icons-png.flaticon.com/128/349/349237.png" alt="Rupay" className="h-8" />
                        </div>
                        <p className="text-xs text-muted-foreground">Secured by SSL encryption</p>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* UPI Payment Form */}
                  {paymentMethod === 'upi' && (
                    <motion.div 
                      className="border rounded-lg p-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-4">
                        <Label htmlFor="upiId">UPI ID *</Label>
                        <Input
                          id="upiId"
                          name="upiId"
                          placeholder="name@upi"
                          value={formData.upiId}
                          onChange={handleChange}
                          required
                        />
                        <p className="text-sm text-muted-foreground">
                          Please enter your UPI ID (e.g., mobilenumber@upi)
                        </p>
                        
                        <div className="flex flex-wrap gap-4 mt-4">
                          {['Google Pay', 'PhonePe', 'Paytm', 'BHIM', 'Amazon Pay'].map((app) => (
                            <div key={app} className="flex flex-col items-center bg-muted/30 p-3 rounded-lg cursor-pointer hover:bg-muted">
                              <span className="text-sm font-medium">{app}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Net Banking Form */}
                  {paymentMethod === 'netbanking' && (
                    <motion.div 
                      className="border rounded-lg p-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-4">
                        <Label>Select Bank</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {['SBI', 'HDFC', 'ICICI', 'Axis', 'PNB', 'BOI', 'Kotak', 'Yes Bank'].map((bank) => (
                            <div
                              key={bank}
                              className={`border rounded p-3 text-center cursor-pointer hover:border-primary transition-all ${
                                formData.bankName === bank ? 'border-primary bg-primary/5' : ''
                              }`}
                              onClick={() => setFormData(prev => ({ ...prev, bankName: bank }))}
                            >
                              {bank}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Mobile Wallet Form */}
                  {paymentMethod === 'wallet' && (
                    <motion.div 
                      className="border rounded-lg p-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-4">
                        <Label>Select Wallet</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {['Paytm', 'PhonePe', 'Mobikwik', 'Freecharge', 'JioMoney', 'Airtel Money'].map((wallet) => (
                            <div
                              key={wallet}
                              className="border rounded p-3 text-center cursor-pointer hover:border-primary"
                            >
                              {wallet}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Cash on Delivery */}
                  {paymentMethod === 'cod' && (
                    <motion.div 
                      className="border rounded-lg p-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full">
                          <BadgeIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">Cash on Delivery</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Pay with cash when your order is delivered. Additional fee of ₹100 will be applied.
                          </p>
                          <div className="mt-4 bg-muted/30 p-3 rounded-md">
                            <p className="text-sm">Please keep exact change ready for a smoother delivery experience.</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : `Pay ${formatPrice(total)}`}
                    </Button>
                    <p className="text-sm text-muted-foreground text-center mt-2">
                      Your payment information is secure. We use encryption to keep your data safe.
                    </p>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="border rounded-lg p-6 bg-card sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                {items.map((item) => {
                  const itemPrice = item.product.onSale && item.product.salePrice 
                    ? item.product.salePrice 
                    : item.product.price;
                  
                  return (
                    <div key={`${item.product.id}-${item.color}`} className="flex gap-3">
                      <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.product.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {item.product.brand} | {item.color}
                        </p>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs">Qty: {item.quantity}</span>
                          <span className="font-medium">{formatPrice(itemPrice * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (18%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                {paymentMethod === 'cod' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">COD Fee</span>
                    <span>{formatPrice(10000)}</span>
                  </div>
                )}
              </div>
              
              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(total + (paymentMethod === 'cod' ? 10000 : 0))}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
