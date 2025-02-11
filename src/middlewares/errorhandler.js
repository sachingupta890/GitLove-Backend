const errorHandler = (err, req, res, next) => {
  let statusCode = err.status || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors).map((val) => val.message);
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export default errorHandler;
