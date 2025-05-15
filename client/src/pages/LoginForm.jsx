import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Use URLSearchParams to format the data as form-urlencoded
            const formData = new URLSearchParams();
            formData.append("username", username);
            formData.append("password", password);
    
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
                credentials: 'include',
            });
    
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('authToken', data.token);
                alert(`Welcome, ${username}!`);  // Display welcome message
                navigate('/');
            }else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('Login failed');
        }
    };
    

    return (
        <div className="login-form-container">
            <div className="login-form">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
