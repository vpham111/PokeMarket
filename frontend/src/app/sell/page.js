"use client"
import styles from "../components/styles/Sell.css"
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Navbar from "@/app/components/Navbar";
import CardNameInput from "@/app/components/CardNameInput";
import doListingCreate from "@/app/helpers/doListingCreate";
import Link from "next/link";

const conditions = [
    "Near_Mint",
    "Lightly_Played",
    "Moderately_Played",
    "Heavily_Played",
    "Damaged"
];

export default function Page() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showListings, setShowListings] = useState(true)
    const [email, setEmail] = useState("")
    const [userId, setUserId] = useState("")
    const [listings, setListings] = useState([])
    const [cardId, setCardId] = useState(null)
    const [cardPrice, setCardPrice] = useState(0.0)
    const [cardQuantity, setCardQuantity] = useState(1)
    const [filter, setFilter] = useState("all");
    const [condition, setCondition] = useState(conditions[0])
    const router = useRouter()




    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/auth-status", {
                    credentials: "include",
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.status === "success") {
                        setIsAuthenticated(true);
                        setEmail(data.user)

                        console.log(data)
                        await requestListings(data.user)
                    } else {
                        router.push("/login");
                    }
                } else {
                    router.push("/login");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                router.push("/login");
            }
        };

        fetchUserData();
    }, [router]);

    const requestListings = async(userEmail) => {
        try {
            const response = await fetch(`http://localhost:8080/api/getListings?userEmail=${userEmail}`, {
                method: "GET",
                credentials: "include"
            })

            if (response.ok) {
                const data = await response.json()
                if (data.status === "success") {
                    setUserId(data.userId)
                    setListings(data.listings)
                    console.log(data)
                }
            }
        }
        catch {

        }
    }

    const setCardNameCallback = (data) => {
        setCardId(data)
        console.log(data)
    }

    const createListing = async (e) => {
        e.preventDefault()
        try {
            const success = await doListingCreate(cardId, userId, cardPrice, cardQuantity, condition)

            if (success) {
                await requestListings(email)
                setShowListings(true)
                setCardId(null)
                setCardQuantity(1)
                setCardPrice(0.0)
                setCondition(conditions[0])
            }
            else {
                console.error("Listing creation failed")
            }
        }
        catch (e) {
            console.error("Error creating listing", e)
        }

    }

    const filteredListings = listings.filter((item) => {
        if (filter === "all") return true;
        return item.status.toLowerCase() === filter;
    });


    return (
        <>
            <Navbar />
            <div className="sellerButtons">
                <button className="sellerButton" onClick={() => setShowListings(true)}>My Listings</button>
                <button className="sellerButton" onClick={() => setShowListings(false)}>New Listing</button>
            </div>

            <div className="sellerMain">
                {showListings ? (
                    <section className="listings-section">
                        {listings.length > 0 ? (

                            <ul className="listings-list">
                                <div className="listing-filters">
                                    <button
                                        className={`filter-button ${filter === "all" ? "active" : ""}`}
                                        onClick={() => setFilter("all")}
                                    >
                                        All Listings
                                    </button>
                                    <button
                                        className={`filter-button ${filter === "active" ? "active" : ""}`}
                                        onClick={() => setFilter("active")}
                                    >
                                        Active Listings
                                    </button>
                                    <button
                                        className={`filter-button ${filter === "sold" ? "active" : ""}`}
                                        onClick={() => setFilter("sold")}
                                    >
                                        Sold Listings
                                    </button>
                                </div>
                                {filteredListings.map((item) => (
                                    <li key={item.id} className="listing-card">
                                        <div className="listing-attribute"><strong>Name:</strong> {item.full_name}
                                        </div>
                                        <div className="listing-attribute">Price: ${item.price.toFixed(2)}</div>
                                        <div className="listing-attribute">Quantity: {item.quantity}</div>
                                        <div className="listing-attribute">Status: {item.status}</div>
                                        <div className="listing-attribute">Listed
                                            On: {item.created_at.split("T")[0]}</div>
                                        <div className="listing-attribute">Condition: {item.condition.split('_').length > 1 ?
                                            `${item.condition.split('_')[0]} ${item.condition.split('_')[1]}` : item.condition}</div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="listings-empty">No listings found.</p>
                        )}
                    </section>

                ) : (
                    <form onSubmit={createListing}
                          style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center"
                          }}>

                        <div style={{width: "100%", maxWidth: "500px", marginBottom: "1rem"}}>
                            <CardNameInput callback={setCardNameCallback}/>
                        </div>

                        <div style={{display: "flex", alignItems: "center", marginBottom: "1rem"}}>
          <span style={{
              padding: "0.5rem",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              borderRight: "none",
              borderTopLeftRadius: "8px",
              borderBottomLeftRadius: "8px"
          }}>$</span>
                            <input
                                type="number"
                                name="cardPrice"
                                value={cardPrice}
                                className="listingInput"
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setCardPrice(val === "" ? "" : parseFloat(val));
                                }}
                                placeholder="Enter Price"
                                min="0.0"
                                max="9999.99"
                                step=".01"
                                required
                                style={{
                                    border: "1px solid #ccc",
                                    borderTopRightRadius: "8px",
                                    borderBottomRightRadius: "8px",
                                    padding: "0.5rem",
                                    width: "150px"
                                }}
                            />
                        </div>

                        <input
                            type="number"
                            name="cardQuantity"
                            value={cardQuantity}
                            className="listingInput"
                            onChange={(e) => {
                                const val = e.target.value;
                                setCardQuantity(val === "" ? "" : parseInt(val));
                            }}
                            placeholder="Enter Quantity"
                            min="1"
                            max="30"
                            required
                            style={{ marginBottom: "1rem", padding: "0.5rem", width: "150px" }}
                        />

                        <select value={condition} onChange={(e) => setCondition(e.target.value)}>
                            {conditions.map((option, idx) => (
                                <option key={idx} value={conditions[idx]}>
                                    {conditions[idx]}
                                </option>
                            ))}
                        </select>

                        <button type="submit" disabled={!cardId} className="createListingButton">Submit</button>
                    </form>
                )}
            </div>
        </>

    )
}