"use client"
import styles from "../components/styles/Login.css"
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ token, newPassword: password }),
            });

            const data = await response.json();

            if (data.status === "success") {
                setMessage("Password successfully updated");
                setTimeout(() => router.push("/login"), 1500);
            } else {
                setError(data.message || "Reset failed");
            }
        } catch (err) {
            console.error("Reset failed", err);
            setError("Something went wrong");
        }
    };

    return (
        <div className="loginPage">
            <div className="loginMain">
                <h3 style={{ color: "black" }}>Reset Your Password</h3>

                <form onSubmit={handleSubmit}>
                    <label className="loginLabel">New Password:</label>
                    <input
                        type="password"
                        className="loginInput"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <label className="loginLabel">Confirm Password:</label>
                    <input
                        type="password"
                        className="loginInput"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <div className="wrap">
                        <button type="submit" className="loginButton">Submit</button>
                    </div>
                </form>

                {error && <div style={{ color: "red" }}>{error}</div>}
                {message && <div style={{ color: "green" }}>{message}</div>}
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="loginPage">
                <div className="loginMain">
                    <h3 style={{ color: "black" }}>Loading...</h3>
                </div>
            </div>
        }>
            <ResetPasswordForm />
        </Suspense>
    );
}