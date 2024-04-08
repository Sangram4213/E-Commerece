const ErrorHander = require("../utils/errorHandler");
const catchAyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendEmail = require('../utils/sendEmail');

//Register a User
exports.registerUser = catchAyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "profilepictureUrl",
    },
  });
  // const token = user.getJWTToken();
  //  res.status(201).json({
  //     success:true,
  //     token,
  //  })
  sendToken(user, 200, res);
});

//Login User
exports.loginUser = catchAyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  ///checking if user has given password and email both
  if (!email || !password) {
    return next(new ErrorHander("Please Enter Password and Email", 400));
  }
  //As we set password as false in model
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }
  const isPasswordMatched = user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

//Logout User

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forget Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  //Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  //We reset the value of resetPassword after the function getResetPasswordToken function call so we have to save it.
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your Password reset token is is :- \n\n ${resetPasswordUrl} n\n If you have not requested this email  then please ignore it`;

  try{
      
    await sendEmail({
       email:user.email,
       subject:`Ecommerce Password Recovery`,
       message,
    })
    
    res.status(200).json({
      success:true,
      message:`Email sent to ${user.email} successfully`,
    })

  }catch(error){
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=i=undefined;

    await user.save({validateBeforeSave:false});
    return next(new ErrorHander(error.message,500));
  }
});
