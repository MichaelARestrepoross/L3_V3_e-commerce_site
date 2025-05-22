import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:8080/api/users/logout', {
                method: 'POST',
                credentials: 'include',
            });
        } catch (error) {
            console.error('Logout failed:', error);
        }
    
        localStorage.removeItem('authToken');
        navigate('/login');
    };
    

    return (
        <button
            onClick={handleLogout}
            className="text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
