"use client"
import styles from "../components/styles/Login.css"
import doLogin from "@/app/helpers/doLogin";
import doRegister from "@/app/helpers/doRegister";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Page() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const [login, setLogin] = useState(true)
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(email + " " + password)
        let data = {}
        if (login) {
            data = await doLogin(email, password)
        }
        else {
            data = await doRegister(firstName, lastName, email, password)
        }
        console.log(data)

        if (data.status === "success") {
            router.push('/')
        } else if (data.message === "Email Does Not Exist") {
            setError("Email Does Not Exist")
        } else if (data.message === "Incorrect Password") {
            setError("Incorrect Password");
        } else {
            setError(data.message || "Login failed");
        }
    }

    const changeMode = async (e) => {
        e.preventDefault()
        if (login) {
            setLogin(false)
            return
        }
        setLogin(true)
    }

    return (
        <div className="loginPage">
            {login ? (
                <div className="loginMain">
                    <h3 style={{color: "black"}}>Enter your login credentials</h3>

                    <form onSubmit={handleSubmit}>
                        <label className="loginLabel">
                            Email:
                        </label>
                        <input type="text" id="email" name="email" value={email} className="loginInput"
                               onChange={(e) => setEmail(e.target.value)}
                               placeholder="Enter your Email" required/>

                        <label htmlFor="password" className="loginLabel">
                            Password:
                        </label>
                        <input type="password" id="password" name="password" value={password} className="loginInput"
                               onChange={(e) => setPassword(e.target.value)}
                               placeholder="Enter your Password" required/>
                        <div className="wrap">
                            <button type="submit" className="loginButton">
                                Submit
                            </button>
                        </div>
                    </form>

                    {error && (
                        <div className="error-message" style={{color: "red", marginTop: "10px"}}>
                            {error}
                        </div>
                    )}

                    <p style={{color: "black"}}>
                        Not a Member?{" "}
                        <span onClick={changeMode} style={{color: "blue", cursor: "pointer"}}>
                            Join Now
                        </span>
                    </p>
                </div>) : (
                <div className="loginMain">

                    <form onSubmit={handleSubmit}>
                        <label className="loginLabel">
                            First Name:
                        </label>
                        <input type="text" id="first" name="first" value={firstName} className="loginInput"
                               onChange={(e) => setFirstName(e.target.value)}
                               placeholder="Enter your First Name" required/>
                        <label className="loginLabel">
                            Last Name:
                        </label>
                        <input type="text" id="last" name="last" value={lastName} className="loginInput"
                               onChange={(e) => setLastName(e.target.value)}
                               placeholder="Enter your Last Name" required/>
                        <label className="loginLabel">
                            Email:
                        </label>
                        <input type="text" id="email" name="email" value={email} className="loginInput"
                               onChange={(e) => setEmail(e.target.value)}
                               placeholder="Enter your Email" required/>

                        <label htmlFor="password" className="loginLabel">
                            Password:
                        </label>
                        <input type="password" id="password" name="password" value={password} className="loginInput"
                               onChange={(e) => setPassword(e.target.value)}
                               placeholder="Enter your Password" required/>
                        <div className="wrap">
                            <button type="submit" className="loginButton">
                                Submit
                            </button>
                        </div>
                    </form>

                    {error && (
                        <div className="error-message" style={{color: "red", marginTop: "10px"}}>
                            {error}
                        </div>
                    )}
                    <p>
                        Already a Member?{" "}
                        <span onClick={changeMode} style={{color: "blue", cursor: "pointer"}}>
                            Login
                        </span>
                    </p>
                </div>
            )}
        </div>
    )
}