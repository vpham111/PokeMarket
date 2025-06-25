"use client";

import "../components/styles/wishlist.css";
import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import FullSearch from "@/app/components/FullSearch";
import FilterSort from "@/app/components/FilterSort";

export default function Page() {

  // Placeholder
    const wishlistItems = [
      { id: 1, name: "Card Details", price: 25.99, image: "/card-placeholder.jpg" },
      { id: 2, name: "Card Details", price: 15.99, image: "/card-placeholder.jpg" },
      { id: 3, name: "Card Details", price: 15.99, image: "/card-placeholder.jpg" },
      { id: 4, name: "Card Details", price: 15.99, image: "/card-placeholder.jpg" }

    ];

    useEffect(() => {
        
    }, []);

    return (
      <>
      <Navbar/>
      <FullSearch/>
      <FilterSort/>
    <div className="layout">
        <div className="section-header">
          <span className="summary-text">Wishlist</span>
        </div>

        <div className="box">      
          <div className="saved-items">
            {wishlistItems.map(item => (
              <div key={item.id} className="saved-item">
                <div className="card-image">
                  <div className="card-placeholder">Card Pic</div>
                </div>
                <div className="item-details">
                  <h3>Card Details</h3>
                  <p className="item-price">Price: ${item.price}</p>
                  <div className="item-controls">
                    <div className="num-of-listings">
                      <label>Number of listings: </label>
                    </div>
                    <button className="add-btn" disabled>Add</button>
                    <button className="remove-btn" disabled>Remove</button>
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