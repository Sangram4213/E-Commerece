const Order = require("../models/orderModel");
const ErrorHander = require("../utils/errorHandler");
const catchAyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/productModel");

//Create new Order
exports.newOrder = catchAyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

//Get Single Order

exports.getSingleOrder = catchAyncErrors(async (req, res, next) => {
  const orderId = req.params.id;

  const order = await Order.findById(orderId).populate("user", "name email");

  if (!order) {
    return next(new ErrorHander("Order does not exist with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//Get logged in user Orders
exports.myOrders = catchAyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//Get all Orders --Admin
exports.getAllOrders = catchAyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmout = 0;

  orders.forEach((ord) => {
    totalAmout += ord.totalPrice;
  });

  res.status(200).json({
    success: true,
    orders,
    totalAmout,
  });
});

//Update Order Status --Admin
exports.updateOrder = catchAyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }
  
    if (order.orderStatus === "Delivered") {
      return next(new ErrorHander("You have already delivered this order", 400));
    }
  
    order.orderItems.forEach(async (ord) => {
      await updateStock(ord.product, ord.quantity,next);
    });
  
    order.orderStatus = req.body.status;
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
  
    return res.status(200).json({
      success: true,
    });
  });
  

//Update Stock function --Admin
async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHander("Product is not found!",404));
  }
  
  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

//Delete Orders --Admin
exports.deleteOrder = catchAyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order does not exist with Id:", 404));
  }

  await Order.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
  });
});
