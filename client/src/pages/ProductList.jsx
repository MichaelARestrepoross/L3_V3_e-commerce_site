import React, { useEffect, useState } from 'react';
import './ProductList.css'; // custom CSS file

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/products', {
                    credentials: 'include',
                });
                if (!res.ok) throw new Error('Failed to fetch products');

                const data = await res.json();
                setProducts(data);
            } catch (err) {
                setError('Could not load products');
            }
        };

        fetchProducts();
    }, []);

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="product-list-container">
            <h2>All Products</h2>

            <input
                type="text"
                placeholder="Search products..."
                className="search-bar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {error && <p className="error-text">{error}</p>}

            <div className="product-grid">
                {filtered.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    filtered.map(product => (
                        <div key={product.id} className="product-card">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p className="price">${product.price.toFixed(2)}</p>
                            {product.imageUrl && (
                                <img src={product.imageUrl} alt={product.name} className="product-image" />
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductList;
