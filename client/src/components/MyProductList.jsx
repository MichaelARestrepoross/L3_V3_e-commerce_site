import React, { useEffect, useState } from 'react';
import './MyProductList.css';

const MyProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMyProducts = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/products/my', {
                    credentials: 'include',
                });
                if (!res.ok) throw new Error('Failed to fetch your products');

                const data = await res.json();
                setProducts(data);
            } catch (err) {
                setError('Could not load your products');
            }
        };

        fetchMyProducts();
    }, []);

    if (error) return <p className="error-text">{error}</p>;
    if (products.length === 0) return <p className="info-text">You haven't added any products yet.</p>;

    return (
        <div className="my-products-container">
            <h3 className="section-title">My Products</h3>
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <h4 className="product-name">{product.name}</h4>
                        <p className="product-description">{product.description}</p>
                        <p className="product-price">${product.price.toFixed(2)}</p>
                        {product.imageUrl && (
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="product-image"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyProductList;
