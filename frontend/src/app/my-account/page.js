"use client";

import "../components/styles/my-account.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
    const [firstName] = useState("");
    const [lastName] = useState("");
    const [email] = useState("");
    const [_, setPassword] = useState("");
    const router = useRouter();

    return (
        <>
            <div className="layout">
                <div className="tool-bar">
                    <span onClick={() => router.push("/home")} style={{ color: "black", cursor: "pointer" }}>
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
                            Welcome Back, {firstName + " " + lastName}
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
                            <button className="button" onClick={() => router.push("/home")}>
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
