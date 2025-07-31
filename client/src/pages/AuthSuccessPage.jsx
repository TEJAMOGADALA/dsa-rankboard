import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const AuthSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');

        if (token) {
            localStorage.setItem('token', token);
            navigate('/dashboard');
        } else {
            // Handle error or no token case
            navigate('/login');
        }
    }, [searchParams, navigate]);

    return (
        <div>
            <p>Logging you in...</p>
        </div>
    );
};

export default AuthSuccessPage;