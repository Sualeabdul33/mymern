const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Review = require("../models/review");

exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;
  await Review.create(req.body);
  res.status(201).json({
    status: "success",
    message: "Review created successfully",
  });
  next();
});

exports.getReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.productId) filter = { product: req.params.productId };
  const reviews = await Review.find(filter);
  if (!reviews) return next(new AppError(400, "Review not found"));
  res.status(200).json({
    status: "success",
    result: reviews.length,
    reviews,
  });
  next();
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) return next(new AppError(400, "Review not found"));
  res.status(200).json({
    status: "success",
    review,
  });
  next();
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!review) return next(new AppError(400, "Review not found"));
  res.status(200).json({
    status: "success",
    review,
  });
  next();
});

exports.deleteReview = async (req, res, next) => {
  await Review.deleteById(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Review deleted successfully",
  });
  next();
};
