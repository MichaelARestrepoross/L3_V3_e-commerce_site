import React, { useEffect, useState } from 'react';
import './UserProfile.css';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/users/me', {
                    credentials: 'include',
                });

                if (!res.ok) throw new Error('Not logged in');
                const data = await res.json();
                setUser(data);
            } catch (err) {
                setError('Failed to load profile');
            }
        };

        fetchUser();
    }, []);

    if (error) return <p className="text-red-500">{error}</p>;
    if (!user) return <p>Loading...</p>;

    return (
        <div className="user-profile-container">
            <h2>User Profile</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>

            <button onClick={() => setEditing(!editing)}>
                {editing ? 'Cancel Edit' : 'Edit Profile'}
            </button>

            {editing && (
                <form className="user-profile-form">
                    <label>Email</label>
                    <input type="email" defaultValue={user.email} />

                    <label>Password</label>
                    <input type="password" placeholder="New password" />

                    <button type="submit">Save Changes</button>
                </form>
            )}
        </div>
    );
};

export default UserProfile;
