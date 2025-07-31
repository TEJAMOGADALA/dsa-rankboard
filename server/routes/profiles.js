const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { updateProfile } = require('../controllers/profileController');
const { getLeetCodeProfile } = require('../controllers/profileController');
const { getCodeforcesProfile } = require('../controllers/profileController');
const { getTestScore } = require('../controllers/profileController');

// @route   PUT /api/profiles
// @desc    Update user profile
// @access  Private
router.put('/', auth, updateProfile);

// @route   GET /api/profiles/leetcode/:username
// @desc    Get LeetCode stats for a user
// @access  Public (for testing)
router.get('/leetcode/:username', getLeetCodeProfile);

// @route   GET /api/profiles/codeforces/:handle
// @desc    Get Codeforces stats for a user
// @access  Public (for testing)
router.get('/codeforces/:handle', getCodeforcesProfile);

// @route   GET /api/profiles/score/:leetcodeUsername/:codeforcesHandle
// @desc    Test the scoring algorithm for a user
// @access  Public (for testing)
router.get('/score/:leetcodeUsername/:codeforcesHandle', getTestScore);

module.exports = router;