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

  //Mongoose duplicate key error
  if(err.code = 11000){
    const message = `Duplicate ${Object.keys(err.keyValue)} ENtered`;
    err=new ErrorHander(message,400);
  }
 
  //Wrong JWT error
  if(err.code = "jsonWebTokenError"){
    const message = `Json Web TOken is invalid, try again`;
    err=new ErrorHander(message,400);
  }
  
  //JWT Expire Error
  if(err.code ="TokenExpiredError"){
    const message = `Json Web TOken is Expired, try again`;
    err=new ErrorHander(message,400);
  }


  res.status(statusCode).json({
    success: false,
    message: message,
  });
};
