import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        leetcode_url: '',
        codeforces_url: '',
    });

    const { leetcode_url, codeforces_url } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    // In DashboardPage.jsx
    const onSubmit = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/profiles', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token // Send the token in the header
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log('Profile updated:', data);
            // You can add a success message here
        } catch (err) {
            console.error(err);
        }
    };

    const onLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <h1>User Dashboard</h1>
            <p>Link your competitive programming profiles.</p>
            
            <form onSubmit={onSubmit}>
                <div>
                    <label>LeetCode URL</label>
                    <input
                        type="text"
                        name="leetcode_url"
                        value={leetcode_url}
                        onChange={onChange}
                        placeholder="https://leetcode.com/username"
                    />
                </div>
                <div>
                    <label>Codeforces URL</label>
                    <input
                        type="text"
                        name="codeforces_url"
                        value={codeforces_url}
                        onChange={onChange}
                        placeholder="https://codeforces.com/profile/username"
                    />
                </div>
                <button type="submit">Save Profiles</button>
            </form>

            <hr />
            <button onClick={onLogout}>Logout</button>
        </div>
    );
};

export default DashboardPage;