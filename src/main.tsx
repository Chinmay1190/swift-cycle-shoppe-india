
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CartProvider } from '@/hooks/useCart';
import { AnimatePresence } from 'framer-motion';

createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <AnimatePresence mode="wait">
      <App />
    </AnimatePresence>
  </CartProvider>
);
