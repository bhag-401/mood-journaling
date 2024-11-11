import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (userData) => {
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            
            if (!response.ok) throw new Error('Invalid credentials');

            const data = await response.json();
            if (!data.user) throw new Error('Invalid credentials');
            setUser(data.user);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const logout = () => {
        setUser(null);
        // Optionally, you can clear any tokens stored in localStorage
    };

    const signup = async (userData) => {
        try {
            const response = await fetch('http://localhost:3001/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            
            if (!response.ok) throw new Error('Signup failed');

            const data = await response.json();
            console.log(data);
            if (!data.user) throw new Error('Invalid credentials');
            setUser(data.user);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
