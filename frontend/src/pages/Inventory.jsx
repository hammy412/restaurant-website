import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from 'axios';

export default function Inventory(){
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:5555/inventory')
            .then((response) => {
                setItems(response.data.data);
            })
            .catch((error) => {
                setError('Failed to load inventory data. Please try again later.');
                console.log(error);
            });
    }, []);

    return (
        <div className="inventory-container">
            <NavBar />
            <div className="inventory-content">
                {error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    <div className="inventory-grid">
                        {items.map((item) => (
                            <div key={item.id} className="inventory-item">
                                <h3>{item.name}</h3>
                                <div><strong>Quantity:</strong> {item.quantity}</div>
                                <div><strong>Price:</strong> ${item.price}</div>
                                <div><strong>Status:</strong> {item.status}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
