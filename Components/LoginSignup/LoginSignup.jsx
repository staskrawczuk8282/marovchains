import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginSignup.css'

const LoginSignup = ({ onLoginSuccess }) => {
    const [action, setAction] = useState("Register");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 


    const handleLogin = async () => {
        try {
            const response = await fetch('https://markovportfolio.azurewebsites.net/api/accounts/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, password }),
            });
            const data = await response.text();
            // Handle successful login, e.g., store token in local storage
            localStorage.setItem('token', data);
            // Notify parent component about successful login
            // Redirect to the game page
            navigate('/game'); // Use navigate to redirect to the game page
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleRegister = async () => {
        try {
            const response = await fetch('https://markovportfolio.azurewebsites.net/api/accounts/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, password }),
            });
            const data = await response;
            // Handle successful registration, e.g., show success message
            console.log('Registration successful:', data);
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input type="text" placeholder="Username" value={login} onChange={(e) => setLogin(e.target.value)} />
                </div>
                <div className="input">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <div className="submit-container">
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Register"); handleRegister() }}>
                    Sign Up
                </div>
                <div className={action === "Register" ? "submit gray" : "submit"} onClick={() => { setAction("Login"); handleLogin() }}>
                    Login
                </div>
            </div>
        </div>
    )
}

export default LoginSignup;