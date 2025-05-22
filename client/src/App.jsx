import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import Navbar from './components/Navbar';
import LogoutButton from './components/LogoutButton';
import ProtectedRoute from './components/ProtectedRoute';
import UserProfile from './pages/UserProfile'; 
import ProductList from './pages/ProductList';

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <div className="p-6">
                                <h2>Welcome to the Home Page!</h2>
                                <LogoutButton />
                            </div>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <UserProfile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <ProtectedRoute>
                            <ProductList />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
