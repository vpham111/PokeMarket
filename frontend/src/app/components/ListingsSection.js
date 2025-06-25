import {useEffect, useState} from "react";
import styles from "./styles/ListingsSection.css"


export default function ListingsSection({cardId}) {
    const [listings, setListings] = useState([])


    useEffect(() => {
        const requestListings = async() => {
            try {
                const response = await fetch(`http://localhost:8080/api/getListingsWithCard?cardId=${cardId}`, {
                    method: "GET",
                    credentials: "include"
                })

                if (response.ok) {
                    const data = await response.json()
                    if (data.status === "success") {
                        setListings(data.listings)
                        console.log(data)
                    }
                }
            }
            catch {

            }
        }

        requestListings()
    }, [cardId])


    return (
        <section className="listings-section">
            {listings.length > 0 ? (

                <ul className="listings-list">
                    {listings.map((item) => (
                        <li key={item.id} className="listing-card">
                            <div className="listing-attribute"><strong>Sold By:</strong> {item.seller_name}
                            </div>
                            <div className="listing-attribute">Price: ${item.price.toFixed(2)}</div>
                            <div className="listing-attribute">Quantity Available: {item.quantity}</div>
                            <div className="listing-attribute">Status: {item.status}</div>
                            <div className="listing-attribute">Condition: {item.condition.split('_').length > 1 ?
                                `${item.condition.split('_')[0]} ${item.condition.split('_')[1]}` : item.condition}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="listings-empty">No listings found.</p>
            )}
        </section>
    )
}