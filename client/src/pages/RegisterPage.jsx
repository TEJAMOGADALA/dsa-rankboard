import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
const RegisterPage = () => {
    const navigate = useNavigate(); // Initialize the hook
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
    });
 
    const { email, username, password } = formData;
 
const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
 
    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch('/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username, password }),
            });
            const data = await res.json();
            if (data.token) {
                localStorage.setItem('token', data.token); // Save the token
                navigate('/dashboard'); // Redirect to dashboard
            }
            console.log(data); // You'll get a token here
            // Later, we'll save the token and redirect
        } catch (err) {
            console.error(err.message);
        }
    };
 
    return (
        <form onSubmit={onSubmit}>
            <h2>Register</h2>
            <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
            <input type="text" name="username" value={username} onChange={onChange} placeholder="Username" required />
            <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
    );
};
 
export default RegisterPage;