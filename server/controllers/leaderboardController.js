const pool = require('../config/db');

exports.getLeaderboard = async (req, res) => {
    try {
        // Fetch all user profiles, ordered by score descending
        const leaderboardData = await pool.query(
            "SELECT username, score FROM user_profiles ORDER BY score DESC LIMIT 100"
        );
        
        res.json(leaderboardData.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};