"use client";

import "../components/styles/FilterSort.css";
import { useState, useEffect } from "react";

export default function FilterSort({ onSortChange, onFilterChange }) {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [filterOption, setFilterOption] = useState(null);
    const [sortOption, setSortOption] = useState(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const dropdownContainers = document.querySelectorAll('.button-wrapper');
            let clickedInside = false;
            
            dropdownContainers.forEach(container => {
                if (container.contains(event.target)) {
                    clickedInside = true;
                }
            });
            
            if (!clickedInside) {
                setActiveDropdown(null);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = (dropdown) => {
        setActiveDropdown(prev => prev === dropdown ? null : dropdown);
    };

    const handleFilterSelect = (filterType, value) => {
        if (filterType === "sort") {
            onSortChange(value);           
        } else {
            onFilterChange(filterType, value); 
        }
        setActiveDropdown(null);
    };

    const handleFilterChange = (type, value) => {
        const newFilter = type === null ? null : { type, value };
        setFilterOption(newFilter);
        onFilterSortChange?.({ filter: newFilter, sort: sortOption });
    };

    const handleSortChange = (value) => {
        setSortOption(value);
        onFilterSortChange?.({ filter: filterOption, sort: value });
    };

    const resetFilters = () => {
        onFilterChange(null, null);  
        onSortChange(null);          
        setActiveDropdown(null);
    };

    return (
        <>
                    <div className="content-inner">
                        <div className="button-wrapper">
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <button className="button" onClick={(e) => {
                                        e.stopPropagation();
                                        toggleDropdown('all');
                                    }}>
                                    All Filters
                                    <span style={{ 
                                        transform: activeDropdown === 'all' ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.2s ease-in-out'
                                    }}>▼</span>
                                </button>

                                {activeDropdown === 'all' && (
                                    <div className="dropdown">
                                        <div className="dropdown-item" onClick={() => handleFilterSelect('category', 'Pokemon Cards')}>
                                            Pokemon Cards
                                        </div>
                                        <div className="dropdown-item" onClick={() => handleFilterSelect('category', 'Booster Packs')}>
                                            Booster Packs
                                        </div>
                                        <div className="dropdown-item" onClick={() => handleFilterSelect('category', 'Accessories')}>
                                            Accessories
                                        </div>
                                        <div className="dropdown-item" onClick={() => handleFilterSelect('rarity', 'Common')}>
                                            Common Cards
                                        </div>
                                        <div className="dropdown-item" onClick={() => handleFilterSelect('rarity', 'Rare')}>
                                            Rare Cards
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                            
                        <div className="button-wrapper">
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <button className="button" onClick={(e) => {
                                        e.stopPropagation();
                                        toggleDropdown('quick');
                                    }}>
                                    Quick Filters
                                    <span style={{ 
                                        transform: activeDropdown === 'quick' ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.2s ease-in-out'
                                    }}>▼</span>
                                </button>
                                
                                {activeDropdown === 'quick' && (
                                    <div className="dropdown">
                                        <div className="dropdown-item" onClick={() => handleFilterSelect('quick', 'under-10')}>
                                            Under $10
                                        </div>
                                        <div className="dropdown-item" onClick={() => handleFilterSelect('quick', 'new-arrivals')}>
                                            New Arrivals
                                        </div>
                                        <div className="dropdown-item" onClick={() => handleFilterSelect('quick', 'on-sale')}>
                                            On Sale
                                        </div>
                                        <div className="dropdown-item" onClick={() => handleFilterSelect('quick', 'popular')}>
                                            Most Popular
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="button-wrapper">
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <button className="button" onClick={(e) => {
                                        e.stopPropagation();
                                        toggleDropdown('sort');
                                    }}>
                                    Sort By
                                    <span style={{ 
                                        transform: activeDropdown === 'sort' ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.2s ease-in-out'
                                    }}>▼</span>
                                </button>
                                
                                {activeDropdown === 'sort' && (
                                    <div className="dropdown">
                                        <div className="dropdown-item" onClick={() => handleFilterSelect('sort', 'price-low')}>
                                            Price: Low to High
                                        </div>
                                        <div className="dropdown-item" onClick={() => handleFilterSelect('sort', 'price-high')}>
                                            Price: High to Low
                                        </div>
                                        <div className="dropdown-item" onClick={() => handleFilterSelect('sort', 'name-az')}>
                                            Name: A to Z
                                        </div>
                                        <div className="dropdown-item" onClick={() => handleFilterSelect('sort', 'name-za')}>
                                            Name: Z to to A
                                        </div>
                                        <div className="dropdown-item" onClick={() => handleFilterSelect('sort', 'newest')}>
                                            Newest First
                                        </div>
                                        <div className="dropdown-item" onClick={() => handleFilterSelect('sort', 'rating')}>
                                            Highest Rated
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                        </div>
                        <div className="button-wrapper">
                            <button className="button" onClick={resetFilters}>Reset Filters</button>
                        </div>
                    </div>
        </>
    );
}