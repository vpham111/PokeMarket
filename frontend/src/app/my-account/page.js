"use client";

import "../components/styles/my-account.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";

export default function Page() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [_, setPassword] = useState("");
    const router = useRouter();

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
                        setEmail(data.user);
                        
                        const emailParts = data.user.split('@')[0];
                        setFirstName(emailParts || "User");
                        setLastName("");
                    } else {
                        router.push("/login");
                    }
                } else {
                    router.push("/login");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                router.push("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [router]);

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/logout", {
                method: "POST",
                credentials: "include"
            });
            
            if (response.ok) {
                window.dispatchEvent(new Event('logout'));
                router.push("/");
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="layout">
                    <div className="main">
                        <div className="content-inner">
                            <p>Loading user data...</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (!isAuthenticated) {
        return null; // Will redirect in useEffect
    }

    return (
        <>
            <Navbar />
            <div className="layout">
                <div className="tool-bar">
                    <span onClick={() => router.push("/")} style={{ color: "black", cursor: "pointer" }}>
                        Home
                    </span>
                    <span onClick={() => router.push("/order-history")} style={{ color: "black", cursor: "pointer" }}>
                        Order History
                    </span>
                    <span onClick={() => router.push("/payments")} style={{ color: "black", cursor: "pointer" }}>
                        Payments
                    </span>
                    <span onClick={() => router.push("/collection")} style={{ color: "black", cursor: "pointer" }}>
                        Collection
                    </span>
                </div>

                <div className="main">
                    <div className="content-inner">
                        <h3 style={{ color: "black" }}>
                            Welcome Back, {firstName && lastName ? `${firstName} ${lastName}` : firstName || email}
                        </h3>
                        <p style={{ color: "black" }}>
                            Email: {email}
                        </p>
                        <p>
                            <span onClick={() => setPassword("new-password")} style={{ cursor: "pointer", color: "blue" }}>
                                Change Password
                            </span>
                        </p>
                        <div className="box">
                            <p>Recent Activity</p>
                        </div>

                        <div className="box">
                            <p>Quick Order Status</p>
                        </div>

                        <div className="button-wrapper">
                            <button className="button" onClick={handleLogout}>
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}