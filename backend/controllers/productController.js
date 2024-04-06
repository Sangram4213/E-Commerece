const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHandler");
const catchAyncErrors = require("../middleware/catchAsyncErrors");

//Create Product -- Admin
exports.createProduct = catchAyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//Get All Product

exports.getAllProducts = catchAyncErrors(async (req, res) => {
  const products = await Product.find(); // Fetch all products from the database
  res.status(200).json({ success: true, products }); // Send products in the response
});

//Get Product Details

exports.getProductDetails = catchAyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params._id);
  if (!product) {
    return next(new ErrorHander("Product Not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

//Update product -- Admin

exports.updateProduct = catchAyncErrors(async (req, res) => {
  let product = Product.findById(req.params._id);
  if (!product) {
    return next(new ErrorHander("Product Not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params._id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete Product

exports.deleteProduct = catchAyncErrors(async (req, res, next) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  if (!deletedProduct) {
    return next(new ErrorHander("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Product Delete Successfully!",
  });
});
