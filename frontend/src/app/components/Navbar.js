"use client"
import styles from "./styles/NavBar.css"

import {useRouter} from "next/navigation";

export default function Navbar() {

    const router = useRouter()

    const goToLogin = (e) => {
        e.preventDefault()
        router.push("/login")
    }

    const goToCart = (e) => {
        e.preventDefault()
        router.push("/cart")
    }

    const goToHome = (e) => {
        e.preventDefault()
        router.push("/")
    }

    return (
        <nav className="navBar">
            <div className="logo">
                <h1>
                    <span onClick={goToHome} style={{ cursor: "pointer"}}>LOGO</span>
                </h1>
            </div>
            <div className="buttons">
                <button className="navButton" onClick={goToLogin}>Log In</button>
                <button className="navButton" onClick={goToCart}>Cart</button>
            </div>

        </nav>
    )
}