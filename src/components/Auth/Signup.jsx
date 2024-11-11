import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import logo from '../assets/think.gif';
const Signup = () => {
    const { signup } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup({ email, password });
            setMessage('Signup successful! Please log in.');
            navigate('/');
        } catch (error) {
            setMessage('Signup failed. Please try again.');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h2>Sign Up</h2>
                <p>Create your account</p>
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
                    <button type="submit">Sign Up</button>
                </form>
                {message && <p className="message">{message}</p>}
                <p>Already have an account? <Link to="/">Log in</Link></p>
            </div>
            <div className="signup-illustration">
                <img src={logo} alt="Illustration" />
            </div>
        </div>
    );
};

export default Signup;
