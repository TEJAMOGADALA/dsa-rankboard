import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate(); // Initialize the hook
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (data.token) {
                localStorage.setItem('token', data.token); // Save the token
                navigate('/dashboard'); // Redirect to dashboard
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div>
            {/* Existing Email/Password Form */}
            <form onSubmit={onSubmit}>
                <h2>Login</h2>
                <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
                <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>

            <hr />

            {/* New OAuth Login Links */}
            <div>
                <p>Or continue with</p>
                <a href="http://localhost:5001/auth/google" role="button" style={{ marginRight: '10px' }}>
                    Login with Google
                </a>
                <a href="http://localhost:5001/auth/github" role="button">
                    Login with GitHub
                </a>
            </div>
        </div>
    );
};

export default LoginPage;