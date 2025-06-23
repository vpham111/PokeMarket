'use client'

import { CartProvider } from "use-shopping-cart";

export default function ClientCartProvider({ children }) {
  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      successUrl={`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/success`}
      cancelUrl={`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/`}
      currency="USD"
      shouldPersist={false} 
      loading={<div>Loading cart...</div>}
    >
      {children}
    </CartProvider>
  );
}