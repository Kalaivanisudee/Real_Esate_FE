import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce'; // Ensure lodash is installed for debounce functionality

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [searchParams, setSearchParams] = useState({
        location: '',
        minPrice: '',
        maxPrice: '',
        type: '',
        status: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { location, minPrice, maxPrice, type, status } = searchParams;

    useEffect(() => {
        fetchProperties();
    }, [searchParams]);

    const fetchProperties = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await axios.get(`http://localhost:8000/api/properties/`, { params: searchParams });
            setProperties(res.data);
        } catch (err) {
            setError('Error fetching properties. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Debounced search function
    const debouncedSearch = debounce(() => {
        fetchProperties();
    }, 300); // Adjust delay as needed

    const onChange = e => {
        setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
        debouncedSearch();  // Call debounced search function
    };

    return (
        <div className="container">
            <h1 className="my-4">Search Properties (Give two details)</h1>
            <form onSubmit={e => e.preventDefault()} className="mb-4">
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <input type="text" name="location" value={location} onChange={onChange} className="form-control" placeholder="Location" />
                    </div>
                    <div className="form-group col-md-2">
                        <input type="number" name="minPrice" value={minPrice} onChange={onChange} className="form-control" placeholder="Min Price" />
                    </div>
                    <div className="form-group col-md-2">
                        <input type="number" name="maxPrice" value={maxPrice} onChange={onChange} className="form-control" placeholder="Max Price" />
                    </div>
                    <div className="form-group col-md-2">
                        <select name="type" value={type} onChange={onChange} className="form-control">
                            <option value="">All Types</option>
                            <option value="apartment">Apartment</option>
                            <option value="house">House</option>
                            <option value="condo">Condo</option>
                            <option value="land">Land</option>
                        </select>
                    </div>
                    <div className="form-group col-md-2">
                        <select name="status" value={status} onChange={onChange} className="form-control">
                            <option value="All Statuses">All Statuses</option>
                            <option value="available">Available</option>
                            <option value="sold">Sold</option>
                        </select>
                    </div>
                </div>
            </form>
            {loading && <p>Loading properties...</p>}
            {error && <p className="text-danger">{error}</p>}
            <ul className="list-group">
                {properties.length > 0 ? (
                    properties.map(property => (
                        <li key={property._id} className="list-group-item">
                            <p>AgentName: {property.title}</p>
                            <p>Description: {property.description}</p>
                            <p>Price: {property.price}</p>
                            <p>Location: {property.location}</p>
                            <p>Type: {property.type}</p>
                            <p>Status: {property.status}</p>
                            <Link to={`/properties/${property._id}`}><button className="btn btn-primary" >Property Lists</button></Link>
                        </li>
                    ))
                ) : (
                    <li className="list-group-item">No properties found.</li>
                )}
            </ul>
        </div>
    );
};

export default PropertyList;
