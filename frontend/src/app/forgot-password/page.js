"use client"
import styles from "../components/styles/Login.css"
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Page() {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`http://localhost:8080/api/forgot-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", 
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
            setSuccess("Check your email for the reset link.");
        } else if (response.status === 404) {
            setError("Email Does Not Exist");
        } else {
            setError("Something went wrong");
        }
    } catch (error) {
        console.error("Request failed", error);
        setError("Something went wrong. Please try again.");
    }
};

    return (
        <div className="loginPage">
                <div className="loginMain">
                    <h3 style={{color: "black"}}>Password Reset</h3>

                    <form onSubmit={handleSubmit}>
                        <label className="loginLabel">
                            Email:
                        </label>
                        <input type="text" id="email" name="email" value={email} className="loginInput"
                               onChange={(e) => setEmail(e.target.value)}
                               placeholder="Enter your Email" required/>
                        <div className="wrap">
                            <button type="submit" className="loginButton">
                                Submit
                            </button>
                        </div>
                    </form>

                    {success && (
                        <div className="success-message" style={{color: "green", marginTop: "10px"}}>
                            {success}
                        </div>
                    )}

                    {error && (
                        <div className="error-message" style={{color: "red", marginTop: "10px"}}>
                            {error}
                        </div>
                    )}
                </div>
        </div>
    )
}