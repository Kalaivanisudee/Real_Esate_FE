import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { name, email, password } = formData;
    const navigate = useNavigate();

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://real-estate-be-oucj.onrender.com/api/auth/register', formData);
            // Redirect to login page after successful registration
            navigate('/login');
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <h1 className="mb-4">Register</h1>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} className="form-control" required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={email} onChange={onChange} className="form-control" required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default Register;
