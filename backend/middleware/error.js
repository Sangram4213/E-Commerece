const ErrorHander = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  //Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    const customError = new ErrorHandler(message, 400);
    return next(customError); // Pass the custom error to the error handling middleware
  }

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};
