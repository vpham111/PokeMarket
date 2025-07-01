"use client";

import "../components/styles/cart.css";
import { useShoppingCart } from "use-shopping-cart";
import { useState } from "react";
import Navbar from "@/app/components/Navbar";

function CartContent({ onSaveForLater }) {
  const {
    cartDetails,
    removeItem,
  } = useShoppingCart();

  const hasItems = cartDetails && Object.keys(cartDetails).length > 0;

  const subtotal = hasItems ? Object.values(cartDetails).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ) / 100 : 0;

  const estimatedShipping = 0.0;
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
          <div className="col-actions">Actions</div>
        </div>

        {!hasItems && (
          <div className="empty-cart">
            <p>Your cart is empty</p>
          </div>
        )}

        {hasItems && Object.keys(cartDetails).map((key) => {
          const item = cartDetails[key];
          return (
            <div key={key} className="table-row item-row">
              <div className="col-name item-name">{item.name}</div>
              <div className="col-quantity">{item.quantity}</div>
              <div className="col-price">${((item.price * item.quantity) / 100).toFixed(2)}</div>
              <div className="col-actions">
                <button
                  onClick={() => {
                    removeItem(key);
                    onSaveForLater({ ...item, id: key });
                  }}
                  className="save-later-btn"
                >
                  Save for Later
                </button>
                <button onClick={() => removeItem(key)} className="remove-btn">
                  Remove
                </button>
              </div>
            </div>
          );
        })}

        {hasItems && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}


function SavedForLater({ savedItems, onRemoveSaved, onAddToCart }) {
  const hasSaved = savedItems.length > 0;

  return (
    <div className="saved-section">
      <div className="section-header">
        <span className="summary-text">Saved for Later</span>
      </div>

      <div className="saved-items">
        {!hasSaved && <p>No saved items.</p>}

        {hasSaved && savedItems.map((item) => (
          <div key={item.id} className="saved-item">
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="item-price">${(item.price / 100).toFixed(2)}</p>
              <div className="item-controls">
                <button onClick={() => onAddToCart(item)} className="add-btn">
                  Add to Cart
                </button>
                <button onClick={() => onRemoveSaved(item.id)} className="remove-btn">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default function Page() {
  const [savedItems, setSavedItems] = useState([]);
  const { addItem } = useShoppingCart();

  const handleSaveForLater = (item) => {
    setSavedItems((prev) => [...prev, item]);
  };

  const handleRemoveSaved = (id) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddToCart = (item) => {
    addItem({
      ...item,
      id: item.id.toString(),
      price: item.price,
      currency: "USD",
    });
    // Remove from saved items when added back to cart
    handleRemoveSaved(item.id);
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <CartContent onSaveForLater={handleSaveForLater} />
        <SavedForLater
          savedItems={savedItems}
          onRemoveSaved={handleRemoveSaved}
          onAddToCart={handleAddToCart}
        />
      </div>
    </>
  );
}

