'use client'

import "../components/styles/cart.css";
// import { useShoppingCart } from 'use-shopping-cart';
import { useEffect, useState } from 'react';
import Navbar from "@/app/components/Navbar";

function CartContent() {
  // const cartHook = useShoppingCart();
  
  // if (!cartHook) {
  //   return <div>Loading cart...</div>;
  // }
  
  // const { cartDetails, removeItem, totalPrice, cartCount } = cartHook;

  // const handleCheckout = async () => {
  //   if (!cartDetails || Object.keys(cartDetails).length === 0) {
  //     alert('Your cart is empty!');
  //     return;
  //   }

  //   try {
  //     const response = await fetch('/api/checkout', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         items: Object.values(cartDetails).map(item => ({
  //           price_data: {
  //             currency: 'usd',
  //             product_data: {
  //               name: item.name,
  //             },
  //             unit_amount: item.price, 
  //           },
  //           quantity: item.quantity,
  //         })),
  //       }),
  //     });

  //     const session = await response.json();
      
  //     const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  //     const result = await stripe.redirectToCheckout({
  //       sessionId: session.id,
  //     });

  //     if (result.error) {
  //       console.error(result.error.message);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  // if (!cartDetails || Object.keys(cartDetails).length === 0) {
  //   return (
  //     <div className="cart-section" >
  //       <div className="section-header">
  //         <span className="summary-text">Summary</span>
  //       </div>
  //       <div className="cart-table">
  //         <div className="table-row header-row">
  //           <div className="col-name">Item Name</div>
  //           <div className="col-quantity">Quantity</div>
  //           <div className="col-price">Price</div>
  //         </div>
  //         <div className="empty-cart">
  //           <p>Your cart is empty</p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // const subtotal = totalPrice / 100;
  // const estimatedShipping = 0.00;
  // const total = subtotal + estimatedShipping;

  // Placeholder items:
  const cartDetails = {
    'item1': { name: 'Example Item 1', quantity: 2, price: 999 },
    'item2': { name: 'Example Item 2', quantity: 1, price: 499 }
  };
  const subtotal = (2 * 9.99) + (1 * 4.99);
  const estimatedShipping = 0.00;
  const total = subtotal + estimatedShipping;

  return (
    <div className="cart-section">
      <div className="section-header">
        <span className="summary-text">Summary</span>
      </div>
      
      <div className="cart-table">
        <div className="table-row header-row">
          <div className="col-name">Item Name</div>
          <div className="col-quantity">Quantity</div>
          <div className="col-price">Price</div>
        </div>
        
        {Object.keys(cartDetails).map((key) => {
          const item = cartDetails[key];
          return (
            <div key={key} className="table-row item-row">
              <div className="col-name item-name">
                <span>{item.name}</span>
                <div className="item-actions">
                  {/* <button onClick={() => removeItem(key)} className="remove-btn">Remove</button>
                  <button className="save-later-btn">Save for Later</button> */}
                </div>
              </div>
              <div className="col-quantity">{item.quantity}</div>
              <div className="col-price">${(item.price / 100).toFixed(2)}</div>
            </div>
          );
        })}
        
        <div className="table-row total-row">
          <div className="col-name">Item Total</div>
          <div className="col-quantity"></div>
          <div className="col-price">${subtotal.toFixed(2)}</div>
        </div>
        
        <div className="table-row shipping-row">
          <div className="col-name">Estimated Shipping</div>
          <div className="col-quantity"></div>
          <div className="col-price">${estimatedShipping.toFixed(2)}</div>
        </div>
        
        <div className="table-row subtotal-row">
          <div className="col-name">Cart Subtotal</div>
          <div className="col-quantity"></div>
          <div className="col-price">${total.toFixed(2)}</div>
        </div>
      </div>
      
      <div className="checkout-button-container">
        {/* <button className="checkout-btn" onClick={handleCheckout}>
          Check Out
        </button> */}
        <button className="checkout-btn" disabled>Check Out</button>
      </div>
    </div>
  );
}

function SavedForLater() {
  const savedItems = [
    { id: 1, name: "Card Details", price: 25.99, image: "/card-placeholder.jpg" },
    { id: 2, name: "Card Details", price: 15.99, image: "/card-placeholder.jpg" }
  ];

  return (
    <div className="saved-section">
      <div className="section-header">
        <span className="summary-text">Saved for Later</span>
      </div>
      
      <div className="saved-items">
        {savedItems.map(item => (
          <div key={item.id} className="saved-item">
            <div className="card-image">
              <div className="card-placeholder">Card Pic</div>
            </div>
            <div className="item-details">
              <h3>Card Details</h3>
              <p className="item-price">Price: ${item.price}</p>
              <div className="item-controls">
                <div className="quantity-control">
                  <label>Qty</label>
                  <input type="number" defaultValue="1" min="1" disabled />
                </div>
                <button className="add-btn" disabled>Add</button>
                <button className="remove-btn" disabled>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <div>Loading cart...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="page-container">
        
        <CartContent />
        <SavedForLater />
      </div>
    </>
  );
}
