const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHandler");
const catchAyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//Create Product -- Admin
exports.createProduct = catchAyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//Get All Product

exports.getAllProducts = catchAyncErrors(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query; // Fetch all products from the database
  res.status(200).json({ success: true, products, productCount }); // Send products in the response
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

// Create New Review or Update the review
exports.createProductReview = catchAyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  if(!product){
    return next(new ErrorHander("Product is not exist",404));
  }

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = Number(rating);
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;

 product.reviews.forEach((rev) => {
    avg += rev.rating;
  })
  
  product.ratings = avg/ product.reviews.length;

  await product.save({validateBeforeSave:false});

  res.status(200).json({
    success:true,
  })
});

