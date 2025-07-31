const cron = require('node-cron');
const pool = require('../config/db');
const { fetchLeetCodeStats } = require('../services/leetcodeService');
const { fetchCodeforcesStats } = require('../services/codeforcesService');
const { calculateV1Score } = require('../services/scoringService');

// Helper function to extract username from URL
const getUsernameFromUrl = (url) => {
    if (!url) return null;
    const parts = url.split('/').filter(part => part.length > 0);
    return parts.pop();
};

const updateAllUsers = async () => {
    console.log('Running daily score update job...');
    try {
        const { rows: profiles } = await pool.query("SELECT * FROM user_profiles");

        for (const profile of profiles) {
            const leetcodeUsername = getUsernameFromUrl(profile.leetcode_url);
            const codeforcesHandle = getUsernameFromUrl(profile.codeforces_url);

            const leetcodeStats = leetcodeUsername ? await fetchLeetCodeStats(leetcodeUsername) : null;
            const codeforcesStats = codeforcesHandle ? await fetchCodeforcesStats(codeforcesHandle) : null;

            const newScore = calculateV1Score(leetcodeStats, codeforcesStats);

            await pool.query("UPDATE user_profiles SET score = $1 WHERE user_id = $2", [newScore, profile.user_id]);
            console.log(`Updated score for ${profile.username} to ${newScore}`);
        }
        console.log('Daily score update job finished.');
    } catch (err) {
        console.error('Error during daily score update:', err);
    }
};

// Schedule the task to run once a day at midnight
cron.schedule('0 0 * * *', updateAllUsers);

// For testing, you can use this line to run it every minute
// cron.schedule('*/1 * * * *', updateAllUsers);

console.log('Cron job for score updates scheduled.');