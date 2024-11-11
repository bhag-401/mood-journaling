// src/components/Auth/Login.js
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from "../assets/think.gif"
const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state

        try {
            await login({ email, password });
            navigate('/MoodEntry'); // Navigate to the homepage or mood entry page
        } catch (err) {
            alert('Invalid email or password'); // Set error message on failure
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Welcome</h2>
                <p>To start MoodJournaling</p>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Email address" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <div className="remember-forgot">
                        <a href="/forgot-password">Forgot password?</a>
                    </div>
                    <button type="submit">Sign in</button>
                </form>
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>
            <div className="login-illustration">
                <img src={"https://media.tenor.com/etWShNR7ToEAAAAi/transparent-yo.gif"} alt="Illustration" />
            </div>
        </div>
    );
};

export default Login;
