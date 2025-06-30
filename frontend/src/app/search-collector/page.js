"use client";

import "../components/styles/SearchCollector.css";
import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import FullSearch from "@/app/components/FullSearch";
import FilterSort from "@/app/components/FilterSort";

export default function Page() {

  // Placeholder
    const searchItems = [
      { id: 1, name: "Card Details", count: 2, value: 15.99, image: "/card-placeholder.jpg" },
      { id: 2, name: "Card Details", count: 3, value: 16.99, image: "/card-placeholder.jpg" },
      { id: 3, name: "Card Details", count: 1, value: 11.99, image: "/card-placeholder.jpg" },
      { id: 4, name: "Card Details", count: 4, value: 10.99, image: "/card-placeholder.jpg" },

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
          <span className="summary-text">Search Collector</span>
        </div>

        <div className="box">      
          <div className="saved-items">
            {searchItems.map(item => (
              <div key={item.id} className="saved-item">
                <div className="card-image">
                    <div className="card-placeholder">Card Pic</div> 
                </div>
                <div className="item-details">
                    <h3>Card Details</h3>
                  <div className="value-and-price">
                    <p className="item-price">Price: ${item.value}</p>
                    <label className="item-price">Items: {item.count}</label>
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