import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import MyProductList from '../components/MyProductList';
import AddProductForm from '../components/AddProductForm';


const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [editing, setEditing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' | 'error'
    const [productListKey, setProductListKey] = useState(0);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/users/me', {
                    credentials: 'include',
                });

                if (!res.ok) throw new Error('Not logged in');
                const data = await res.json();
                setUser(data);
                setEmail(data.email);
            } catch (err) {
                setError('Failed to load profile');
            }
        };

        fetchUser();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:8080/api/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                const updated = await res.json();
                setUser(updated);
                setEditing(false);
                setMessage('Profile updated successfully!');
                setMessageType('success');
            } else {
                const errorText = await res.text();
                throw new Error(errorText || 'Failed to update profile');
            }
        } catch (err) {
            setMessage(err.message);
            setMessageType('error');
        }
    };

    if (error) return <p className="text-red-500">{error}</p>;
    if (!user) return <p>Loading...</p>;

    return (
        <div className="user-profile-container">
            <h2>User Profile</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
    
            <button onClick={() => setEditing(!editing)} className="edit-button">
                {editing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
    
            {editing && (
                <form className="user-profile-form" onSubmit={handleUpdate}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
    
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="New password"
                    />
    
                    <button type="submit" className="save-button">Save Changes</button>
    
                    {message && (
                        <p className={messageType === 'success' ? 'success-message' : 'error-message'}>
                            {message}
                        </p>
                    )}
                </form>
            )}
    
            {/* Display the user's products */}
            <div className="my-products-section">
                <h3>My Products</h3>
                <MyProductList key={productListKey} />
            </div>
            <div className="add-product-section">
                <h3>Add Product</h3>
                <AddProductForm onProductAdded={() => setProductListKey(prev => prev + 1)} />
            </div>
        </div>
    );
};

export default UserProfile;
