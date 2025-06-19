'use client'
import LineChart from "@/app/components/LineChart";
import styles from './styles/TopMovers.css'
import InfoSection from "@/app/components/InfoSection";


export default function TopMovers() {

    const AddToPort = (e) => {
        e.preventDefault()

    }
    const AddToWish = (e) => {
        e.preventDefault()
    }

    return (
        <section className="topMovers">
            <div className="left">
                <div className="chart-container">
                    <LineChart/>
                </div>
                <div className="addButtons">
                    <button className="addButton" onClick={AddToPort}>Add To Portfolio</button>
                    <button className="addButton" onClick={AddToWish}>Add To Wishlist</button>
                </div>
            </div>
            <div className="right">
                <InfoSection title="Top Performer" name="Charizard" change={12.5}/>
                <InfoSection title="Runner-up" name="Charizard" change={12.5}/>
                <InfoSection title="Third" name="Charizard" change={12.5}/>
            </div>
        </section>
    )
}