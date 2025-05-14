
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CartProvider } from '@/hooks/useCart';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="system" storageKey="ui-theme">
    <CartProvider>
      <AnimatePresence mode="wait">
        <App />
        <Toaster />
      </AnimatePresence>
    </CartProvider>
  </ThemeProvider>
);
