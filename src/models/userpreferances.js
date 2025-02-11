import mongoose from "mongoose";

const userPreferencesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  preferredGender: {
    type: String,
    enum: ["Male", "Female", "Other", "Any"],
    default: "Any",
  },
  preferredLanguages: [
    {
      type: String,
    },Q
  ],
  preferredLocation: {
    type: String,
  },
});

const UserPreferences = mongoose.model(
  "UserPreferences",
  userPreferencesSchema
);
export default UserPreferences;
