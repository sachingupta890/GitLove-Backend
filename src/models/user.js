import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    githubUsername: {
      type: String,
      required: [true, "GitHub username is required"],
      trim: true,
      unique: true,
    },
    githubRepoCount: {
      type: Number,
      required: [true, "GitHub repo count is required"],
      min: [3, "Must have at least 3 repositories"],
    },
    leetcodeUsername: {
      type: String,
      required: [true, "LeetCode username is required"],
      trim: true,
      unique: true,
    },
    leetcodeProblemSolved: {
      type: Number,
      required: [true, "LeetCode problem count is required"],
      min: [5, "Must have solved at least 5 problems"],
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [3, "Full name must be at least 3 characters"],
      maxlength: [50, "Full name must be at most 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    bio: {
      type: String,
      maxlength: [500, "Bio must be less than 500 characters"],
    },
    skills: [{ type: String, trim: true }],
    preferredLanguages: [{ type: String, trim: true }],
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    location: { type: String, trim: true },
    avatar: {
      type: String,
      validate: {
        validator: function (url) {
          return /^https?:\/\/.+/.test(url);
        },
        message: "Invalid URL format",
      },
    },
    verificationPhoto: {
      type: String, // Stores live photo URL (Uploaded Image Path)
    },
    isVerified: {
      type: Boolean,
      default: false, // Default to unverified until face match
    },
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
