import React, { useEffect, useState } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
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

    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">All Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map(product => (
                    <div key={product.id} className="border rounded p-4 shadow">
                        <h3 className="text-xl font-semibold">{product.name}</h3>
                        <p>{product.description}</p>
                        <p className="text-green-600 font-bold">${product.price.toFixed(2)}</p>
                        {product.imageUrl && (
                            <img src={product.imageUrl} alt={product.name} className="mt-2 max-h-40 object-cover" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
