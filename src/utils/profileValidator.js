import axios from "axios";

// Get GitHub Repo Count
export const getGitHubRepoCount = async (username) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    if (!response.data || response.status !== 200) {
      throw new Error("Failed to fetch GitHub profile data.");
    }
    return response.data.public_repos;
  } catch (error) {
    throw new Error("Invalid GitHub username or API error.");
  }
};

// Get LeetCode Problem Count
export const getLeetCodeProblemCount = async (username) => {
  try {
    const response = await axios.post("https://leetcode.com/graphql", {
      query: `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            submitStatsGlobal {
              acSubmissionNum {
                difficulty
                count
              }
            }
          }
        }`,
      variables: { username },
    });

    if (!response.data || !response.data.data.matchedUser) {
      throw new Error("Invalid LeetCode username or user does not exist.");
    }

    const problems =
      response.data.data.matchedUser.submitStatsGlobal.acSubmissionNum;
    return problems ? problems.reduce((sum, item) => sum + item.count, 0) : 0;
  } catch (error) {
    throw new Error("Invalid LeetCode username or API error.");
  }
};
