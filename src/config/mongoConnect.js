import mongoose from "mongoose";
import { envConfig } from "./envConfig.js";
import logger from "./logger.js";

const connect = async () => {
    try {
    const connection = await mongoose.connect(envConfig.mongo_uri);

    logger.info("Database connected succesfuully")

    logger.info(
      `Connected to database: ${connection.connection.name} on ${connection.connection.host}`
    );
    } catch (error) {
      console.log("error in connection", error);
    logger.error("Error connecting to MongoDB:", error.message);
    process.exit(1); 
  }
};

const close = () => {
  mongoose.connection.close(() => {
    logger.info("MongoDB connection closed");
    process.exit(0);
  });
};

export { connect, close };
