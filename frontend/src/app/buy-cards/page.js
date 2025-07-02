"use client";

import "../components/styles/BuyCards.css";
import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import FullSearch from "@/app/components/FullSearch";
import FilterSort from "@/app/components/FilterSort";
import { useShoppingCart } from "use-shopping-cart";
import { filterAndSortItems } from "../helpers/doFilterSort";

// Placeholder
    const wishlistItems = [
      { id: 1, name: "Card Details", price: 25.99, listings: 3, image: "/card-placeholder.jpg" },
      { id: 2, name: "Card Details", price: 15.99, listings: 3, image: "/card-placeholder.jpg" },
      { id: 3, name: "Card Details", price: 15.99, listings: 3, image: "/card-placeholder.jpg" },
      { id: 4, name: "Card Details", price: 15.99, listings: 3, image: "/card-placeholder.jpg" }

    ];


export default function Page() {
    
    const { addItem } = useShoppingCart();
    const [toastMessage, setToastMessage] = useState("");

    const addToCart = (item) => {
        addItem({
            name: item.name,
            id: item.id.toString(),
            price: Math.round(item.price * 100), 
            currency: "USD",
            image: item.image,
        });

        setToastMessage("Item successfully added to cart!");
        setTimeout(() => setToastMessage(""), 2000);
    };

  const [sortOption, setSortOption] = useState(null);
  const [filterOption, setFilterOption] = useState(null);
  const [filteredSortedItems, setFilteredSortedItems] = useState(wishlistItems);

  const onFilterChange = (type, value) => {
    setFilterOption(type == null ? null : { type, value });
  };

  const onSortChange = (value) => {
    setSortOption(value);
  };

  useEffect(() => {
    setFilteredSortedItems(filterAndSortItems(wishlistItems, filterOption, sortOption));
  }, [wishlistItems, filterOption, sortOption]);

    return (
      <>
      <Navbar/>
      <FullSearch/>
      <FilterSort onFilterChange={onFilterChange} onSortChange={onSortChange}/>
      {toastMessage && (
        <div className="toast-message">
            {toastMessage}
        </div>
    )}
    <div className="layout">
        <div className="section-header">
          <span className="summary-text">Buy Cards</span>
        </div>

        <div className="box">      
          <div className="saved-items">
            {filteredSortedItems.map(item => (
              <div key={item.id} className="saved-item">
                <div className="card-image">
                  <div className="card-placeholder">Card Pic</div>
                </div>
                <div className="item-details">
                  <h3>Card Details</h3>
                  <div className="price-and-listings">
                    <p className="item-price">Price: ${item.price}</p>
                    <label className="item-price">Number of listings: {item.listings}</label>
                  </div>
                  <div className="item-controls">
                    <button className="add-btn" onClick={() => addToCart(item)}>Add to Cart</button>
                    <button className="add-btn" disabled>Add to Wishlist</button>
                    <button className="add-btn" disabled>Add to Collection</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  </>
  );
}