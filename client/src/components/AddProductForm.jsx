
import React, { useState } from 'react';

const AddProductForm = ({ onProductAdded }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const res = await fetch('http://localhost:8080/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    name,
                    description,
                    price: parseFloat(price),
                    imageUrl,
                }),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || 'Failed to create product');
            }

            const created = await res.json();
            setMessage('Product added!');
            setName('');
            setDescription('');
            setPrice('');
            setImageUrl('');

            if (onProductAdded) onProductAdded(created);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="add-product-form">
            <h3>Add New Product</h3>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required />

                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

                <label>Price</label>
                <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />

                <label>Image URL</label>
                <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

                <button type="submit">Add Product</button>

                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default AddProductForm;
