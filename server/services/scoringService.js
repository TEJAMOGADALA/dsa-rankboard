const calculateV1Score = (leetcodeStats, codeforcesStats) => {
    // Define weights for our V1 algorithm
    const LEETCODE_SOLVED_WEIGHT = 1;
    const CODEFORCES_RATING_WEIGHT = 2.5;

    let score = 0;

    if (leetcodeStats && leetcodeStats.totalSolved) {
        score += leetcodeStats.totalSolved * LEETCODE_SOLVED_WEIGHT;
    }

    if (codeforcesStats && codeforcesStats.rating) {
        score += codeforcesStats.rating * CODEFORCES_RATING_WEIGHT;
    }

    return Math.round(score); // Return a whole number
};

module.exports = { calculateV1Score };