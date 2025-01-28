import express from "express"
import app from "./app.js";
import { connect } from "./config/mongoConnect.js";
import { envConfig } from "./config/envConfig.js";
import logger from "./config/logger.js";

connect();
let server;


server = app.listen(envConfig.port, () => {
    logger.info(`sever is running at port ${envConfig.port}`)
})


const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.warn("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};


const unexpectedErrorHandler = (err) => {
  logger.error(err);
  exitHandler();
};

process.setMaxListeners(0);
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});









//password aEHWCRQsmU14iHz6