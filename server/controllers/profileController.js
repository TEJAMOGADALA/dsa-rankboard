const pool = require('../config/db');
const { fetchLeetCodeStats } = require('../services/leetcodeService');
const { fetchCodeforcesStats } = require('../services/codeforcesService');
const { calculateV1Score } = require('../services/scoringService');

exports.updateProfile = async (req, res) => {
    try {
        const { leetcode_url, codeforces_url } = req.body;
        const userId = req.user.id; // From our authMiddleware

        const updatedProfile = await pool.query(
            "UPDATE user_profiles SET leetcode_url = $1, codeforces_url = $2, updated_at = NOW() WHERE user_id = $3 RETURNING *",
            [leetcode_url, codeforces_url, userId]
        );

        res.json(updatedProfile.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getLeetCodeProfile = async (req, res) => {
    try {
        const username = req.params.username;
        const stats = await fetchLeetCodeStats(username);
        if (!stats) {
            return res.status(404).json({ msg: 'LeetCode user not found' });
        }
        res.json(stats);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getCodeforcesProfile = async (req, res) => {
    try {
        const handle = req.params.handle;
        const stats = await fetchCodeforcesStats(handle);
        if (!stats) {
            return res.status(404).json({ msg: 'Codeforces user not found' });
        }
        res.json(stats);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getTestScore = async (req, res) => {
    try {
        const { leetcodeUsername, codeforcesHandle } = req.params;

        // Fetch stats from both platforms
        const leetcodeStats = await fetchLeetCodeStats(leetcodeUsername);
        const codeforcesStats = await fetchCodeforcesStats(codeforcesHandle);

        // Calculate score
        const score = calculateV1Score(leetcodeStats, codeforcesStats);

        res.json({
            details: {
                leetcodeStats,
                codeforcesStats,
            },
            finalScore: score
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};