import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import Navbar from './components/Navbar';
import LogoutButton from './components/LogoutButton';
import ProtectedRoute from './components/ProtectedRoute';

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
            </Routes>
        </div>
    );
}

export default App;
