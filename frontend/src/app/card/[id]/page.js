"use client"
import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import Navbar from "@/app/components/Navbar";
import CardDetails from "@/app/components/CardDetails";
import ListingsSection from "@/app/components/ListingsSection";


export default function Page() {
    const {id: cardId} = useParams()
    const [cardData, setCardData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [refreshListings, setRefreshListings] = useState(0)
    const router = useRouter()

    useEffect(() => {
        fetch(`http://localhost:8080/api/card/${cardId}`, {
            method: "GET",
            credentials: "include"
        }).then((res) => res.json())
            .then((data) => {
                if (data.status === "failed") {
                    router.push("/")
                }
                else {
                    setCardData(data.results)
                    setLoading(false)
                    console.log(data.results)
                }
            })
            .catch((err) => {
                console.error("Error fetching card data:", err)
            })
    }, [cardId]);

    return (
        (loading ? <p></p> :
                <>
                    <Navbar />
                    <p>{cardData[0]}</p>
                    <p>{cardData[4]}</p>
                    <CardDetails cardNum={cardData[2]} cardRarity={cardData[1]} language={cardData[3]}/>

                    <div style={{marginTop: "1rem"}}>
                        <ListingsSection cardId={cardId} />
                    </div>

                </>
        )

    )
}