const ErrorHander = require("../utils/errorHandler");
const catchAyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHander(error.message, 500));
  }
});

//Reset Password

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if(!user){
    return next(new ErrorHander("Reset Password TOken is invalid or has been expired",400));
  }
  if(req.body.password !== req.body.confirmPassword){
    return next(new ErrorHander("Password does not matching",400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user,200,res);
});

//Get User Details
exports.getUsersDetails = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.user.id);

    res.status(200).json({
      success:true,
      user,
    }); 
})

//Update User Password
exports.updateUserPassword = catchAsyncErrors(async(req,res,next)=>{

  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 401));
  }
  
  if(req.body.newPassword !== req.body.confirmPassword){
    return next(new ErrorHander("password is does not matched!",400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user,200,res);
 
});

//Update User Password
exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{
  
  const newUserData ={
    name:req.body.name,
    email:req.body.email
  }
  //We will add cloudinary letter
  const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false,
  });
  
  res.status(200).json({
    success:true
  })
 
});