const fetchCodeforcesStats = async (handle) => {
    try {
        const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
        const data = await response.json();

        if (data.status !== 'OK') {
            throw new Error(data.comment || 'Codeforces user not found or API error');
        }

        const userInfo = data.result[0];
        
        return {
            handle: userInfo.handle,
            rating: userInfo.rating || 0, // Default to 0 if no rating
            maxRating: userInfo.maxRating || 0,
            rank: userInfo.rank || 'unranked',
        };
    } catch (error) {
        console.error(`Error fetching Codeforces stats for ${handle}:`, error.message);
        return null;
    }
};

module.exports = { fetchCodeforcesStats };