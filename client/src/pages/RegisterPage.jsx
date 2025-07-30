import React, { useState } from 'react';
 
const RegisterPage = () => {
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