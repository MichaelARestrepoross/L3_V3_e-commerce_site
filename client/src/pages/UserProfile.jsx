import React, { useEffect, useState } from 'react';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

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
        <div className="p-6 bg-white rounded shadow-md w-full max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
        </div>
    );
};

export default UserProfile;
