import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PropertyList = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const res = await axios.get(`https://real-estate-be-oucj.onrender.com/api/properties/`);
            setProperties(res.data);
        } catch (err) {
            setError('Error fetching properties.');
        } finally {
            setLoading(false);
        }
    };

    const deleteProperty = async (propertyId) => {
        try {
            await axios.delete(`https://real-estate-be-oucj.onrender.com/api/properties/${propertyId}`);
            setProperties(properties.filter(property => property._id !== propertyId));
            alert("Deleted Successfully")

        } catch (err) {
            setError('Error deleting property.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-danger">{error}</div>;
    if (properties.length === 0) return <div>No properties available.</div>;

    return (
        <div className="container">
            <h1 className="my-4">Property List</h1>
            <ul className="list-group">
                {properties.map((property) => (
                    <li key={property._id} className="list-group-item">
                        {/* Ensure property.agent is a string, or access its properties if it's an object */}
                        {/* <p>Agent: {property.agent ? property.agent.name : 'N/A'}</p> */}
                        <p>Title: {property.title}</p>
                        <p>Description: {property.description}</p>
                        <p>Price: ${property.price}</p>
                        <p>Location: {property.location}</p>
                        <p>Type: {property.type}</p>
                        <p>Status: {property.status}</p>
                        <button className="btn btn-danger" onClick={() => deleteProperty(property._id)}>Delete</button>
                        <button className="btn btn-secondary" onClick={() => navigate(`/properties/${property._id}/edit`)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PropertyList;
