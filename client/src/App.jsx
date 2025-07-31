import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import LeaderboardPage from './pages/LeaderboardPage'; 
import PrivateRoute from './components/routing/PrivateRoute';
import AuthSuccessPage from './pages/AuthSuccessPage';

const HomePage = () => <h1>Welcome to the DSA Rankboard!</h1>;

function App() {
  return (
    <Router>
      <div>
        <nav>
            <Link to="/">Home</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link> | <Link to="/dashboard">Dashboard</Link> | <Link to="/leaderboard">Leaderboard</Link> {/* 2. Add Link */}
        </nav>
        <hr />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} /> 
          <Route path="/auth/success" element={<AuthSuccessPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;