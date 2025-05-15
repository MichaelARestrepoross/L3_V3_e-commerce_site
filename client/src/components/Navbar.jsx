import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from '../utils/auth';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleHomeClick = () => {
        if (isLoggedIn()) {
            navigate('/');
        } else {
            navigate('/login');
        }
    };

    return (
        <nav className="bg-purple-600 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                {/* Use a button to trigger navigation */}
                <button
                    onClick={handleHomeClick}
                    className="text-xl font-bold focus:outline-none hover:text-gray-300"
                >
                    E-commerce Site
                </button>
                <div>
                    {isLoggedIn() ? (
                        <button
                            onClick={handleLogout}
                            className="text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
