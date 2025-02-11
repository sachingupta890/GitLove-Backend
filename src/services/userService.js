import User from "../models/user.js";
import bcrypt from "bcrypt";
import {
  getGitHubRepoCount,
  getLeetCodeProblemCount,
} from "../utils/profileValidator.js";
import { compareFaces } from "../utils/awsRekognition.js";

export const registerUser = async (userData) => {
  const {
    fullName,
    email,
    password,
    githubUsername,
    leetcodeUsername,
    avatar,
    verificationPhoto,
  } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw { type: "conflict", message: "User already exists with this email." };
  }

  let githubRepoCount;
  try {
    githubRepoCount = await getGitHubRepoCount(githubUsername);
  } catch (error) {
    throw { type: "external_api", message: error.message };
  }

  if (githubRepoCount < 3) {
    throw {
      type: "validation",
      message: `GitHub profile validation failed: Found ${githubRepoCount} repositories, minimum required is 3.`,
    };
  }

  let leetcodeProblemSolved;
  try {
    leetcodeProblemSolved = await getLeetCodeProblemCount(leetcodeUsername);
  } catch (error) {
    throw { type: "external_api", message: error.message };
  }

  if (leetcodeProblemSolved < 5) {
    throw {
      type: "validation",
      message: `LeetCode profile validation failed: Found ${leetcodeProblemSolved} solved problems, minimum required is 5.`,
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Verify Face Match using AWS Rekognition
  const isVerified = await compareFaces(avatar, verificationPhoto);
  if (!isVerified) {
    throw {
      type: "validation",
      message: "Live photo verification failed. Please upload a valid selfie.",
    };
  }

  const user = new User({
    fullName,
    email,
    password: hashedPassword,
    githubUsername,
    githubRepoCount,
    leetcodeUsername,
    leetcodeProblemSolved,
    avatar,
    verificationPhoto,
    isVerified, 
  });

  return await user.save();
};
