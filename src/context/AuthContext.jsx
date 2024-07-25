import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['x-auth-token'] = token;
            setIsAuthenticated(true);
            // Fetch user data if needed
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const login = async (email, password) => {
        const res = await axios.post('https://real-estate-be-oucj.onrender.com/api/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['x-auth-token'] = res.data.token;
        setIsAuthenticated(true);
        // Fetch user data if needed
    };

    const register = async (name, email, password) => {
        const res = await axios.post('https://real-estate-be-oucj.onrender.com/api/auth/register', { name, email, password });
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['x-auth-token'] = res.data.token;
        setIsAuthenticated(true);
        // Fetch user data if needed
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['x-auth-token'];
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
