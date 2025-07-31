const fetchLeetCodeStats = async (username) => {
    try {
        const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
        if (!response.ok) {
            // If the user is not found or there's an error, the API returns a non-ok status
            const errorData = await response.json();
            throw new Error(errorData.message || 'User not found or API error');
        }
        const data = await response.json();

        // We only need a few key stats for now
        return {
            totalSolved: data.totalSolved,
            easySolved: data.easySolved,
            mediumSolved: data.mediumSolved,
            hardSolved: data.hardSolved,
        };
    } catch (error) {
        console.error(`Error fetching LeetCode stats for ${username}:`, error.message);
        return null; // Return null to indicate failure
    }
};

module.exports = { fetchLeetCodeStats };