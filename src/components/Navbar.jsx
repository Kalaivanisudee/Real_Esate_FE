import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Real Estate Management</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                    {isAuthenticated ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/properties">Properties</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/properties/new">Add Property</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={logout}>Logout</a>
                            
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                            </li>
                            <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
