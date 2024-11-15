import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from 'axios';
import '../css/styles.css';

export default function Inventory() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [newItem, setNewItem] = useState({
        name: '',
        quantity: '',
        price: ''
    });

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({
            ...newItem,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5555/inventory', newItem)
            .then((response) => {
                setItems([...items, response.data]);
                setNewItem({
                    name: '',
                    quantity: '',
                    price: ''
                });
            })
            .catch((error) => {
                setError('Failed to add new item. Please try again later.');
                console.log('Error adding item:', error.response ? error.response.data : error.message);
            });
    };

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:5555/inventory/${id}`)
            .then(() => {
                setItems(items.filter(item => item._id !== id));
            })
            .catch((error) => {
                setError('Failed to delete item. Please try again later.');
                console.log('Error deleting item:', error.response ? error.response.data : error.message);
            });
    };

    const handleIncrement = (id, increment) => {
        const item = items.find(item => item._id === id);
        const updatedItem = { ...item, quantity: item.quantity + increment};

        axios
            .put(`http://localhost:5555/inventory/${id}`, updatedItem)
            .then((response) => {
                setItems(items.map(item => item._id === id ? response.data : item));
            })
            .catch((error) => {
                setError('Failed to update item. Please try again later.');
                console.log('Error updating item:', error.response ? error.response.data : error.message);
            });
    };

    const handleDecrement = (id, decrement) => {
        const item = items.find(item => item._id === id);
        const newQuantity = item.quantity - decrement < 0 ? 0 : item.quantity - decrement;
        const updatedItem = { ...item, quantity: newQuantity};

        axios
            .put(`http://localhost:5555/inventory/${id}`, updatedItem)
            .then((response) => {
                setItems(items.map(item => item._id === id ? response.data : item));
            })
            .catch((error) => {
                setError('Failed to update item. Please try again later.');
                console.log('Error updating item:', error.response ? error.response.data : error.message);
            });
    };

    const getItemClassName = (status) => {
        switch (status) {
            case 'Out of Stock':
                return 'out-of-stock';
            case 'Low Stock':
                return 'low-stock';
            default:
                return 'in-stock';
        }
    }

    return (
        <div>
            <h1 className="inventory-title">Inventory Control System</h1>
            <div className="inventory-container">
                <NavBar />
                <div className="inventory-content">
                    {error && <div className="error-message">{error}</div>}
                    {!error && (
                        <form className="new-item-form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={newItem.name}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="number"
                                min={0}
                                name="quantity"
                                placeholder="Quantity"
                                value={newItem.quantity}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="number"
                                min={0}
                                step={0.01}
                                name="price"
                                placeholder="Price"
                                value={newItem.price}
                                onChange={handleInputChange}
                                required
                            />
                            <button type="submit">Add Item</button>
                        </form>
                    )}
                    <div className="inventory-list">
                        {items.map((item) => (
                            <div key={item._id} className={`inventory-item ${getItemClassName(item.status)}`}>
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <div><strong>Status:</strong> {item.status}</div>
                                    <div><strong>Quantity:</strong> {item.quantity}</div>
                                    <div><strong>Price:</strong> ${item.price}</div>
                                </div>
                                <div className="item-buttons">
                                <button onClick={() => handleIncrement(item._id, 1)}>+ 1</button>
                                <button onClick={() => handleIncrement(item._id, 10)}>+ 10</button>
                                    <button onClick={() => handleDecrement(item._id, 1)}>- 1</button>
                                    <button onClick={() => handleDecrement(item._id, 10)}>- 10</button>
                                    <button onClick={() => handleDelete(item._id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>    
    );
}