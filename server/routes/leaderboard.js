const router = require('express').Router();
const { getLeaderboard } = require('../controllers/leaderboardController');

// @route   GET /api/leaderboard
// @desc    Get the global leaderboard
// @access  Public
router.get('/', getLeaderboard);

module.exports = router;