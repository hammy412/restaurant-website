import React from "react"
import NavBar from "../components/NavBar"

export default function StaffLogin() {
    return (
        <div>
            <NavBar />
            <h1>Staff Login</h1>
            <form>
                <label>Email</label>
                <input type="email" placeholder="Enter Email" required />
                <label>Password</label>
                <input type="password" placeholder="Enter Password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}