"use client"
import { useState, useEffect } from "react";
import styles from "./styles/NavBar.css"
import {useRouter} from "next/navigation";

export default function Navbar() {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
            const res = await fetch("http://localhost:8080/api/auth-status", {
                credentials: "include",
            });
            if (res.ok) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            } catch {
            setIsLoggedIn(false);
            }
        };

        checkAuthStatus();

        const onLogin = () => {
            checkAuthStatus();
        };

        window.addEventListener("login", onLogin);

        return () => {
            window.removeEventListener("login", onLogin);
        };
    }, []);


    const goToLogin = (e) => {
        e.preventDefault()
        router.push("/login")
    }

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/logout", { 
                method: "POST", 
                credentials: "include" 
            });
            
            if (response.ok) {
                setIsLoggedIn(false);
                // Dispatch custom event to notify other components
                window.dispatchEvent(new Event('logout'));
                router.push("/");
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const goToCart = (e) => {
        e.preventDefault()
        router.push("/cart")
    }

    const goToHome = (e) => {
        e.preventDefault()
        router.push("/")
    }

    const goToAccount = (e) => {
        e.preventDefault()
        router.push("/my-account")
    }

    return (
        <nav className="navBar">
            <div className="logo">
                <h1>
                    <span onClick={goToHome} style={{ cursor: "pointer"}}>LOGO</span>
                </h1>
            </div>
            <div className="buttons">
                <button className="navButton" onClick={goToAccount}>My Account</button>
                {isLoggedIn ? (
                    <button className="navButton" onClick={handleLogout}>Log Out</button>
                ) : (
                    <button className="navButton" onClick={goToLogin}>Log In</button>
                )}
                <button className="navButton" onClick={goToCart}>Cart</button>
            </div>
        </nav>
    )
}