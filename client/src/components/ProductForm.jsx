import React, { useState } from 'react';

const ProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:8080/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if (response.ok) {
                setMessage('Product created successfully!');
                setFormData({ name: '', description: '', price: '', imageUrl: '' });
            } else {
                setMessage('Error creating product');
            }
        } catch (err) {
            setMessage('Request failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            {message && <p className="mb-4 text-center text-red-500">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL (optional)"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
