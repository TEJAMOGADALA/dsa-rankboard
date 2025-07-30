import React, { useState } from 'react';
 
const LoginPage = () => {
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
            console.log(data); // You'll get a token here
        } catch (err) {
            console.error(err.message);
        }
    };
 
    return (
        <form onSubmit={onSubmit}>
            <h2>Login</h2>
            <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
            <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
};
 
export default LoginPage;