const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Product = require("../models/product");
const User = require("../models/user");

exports.createProduct = catchAsync(async (req, res, next) => {
  const photos = [];

  req.files?.forEach((el) => {
    const file = {
      fileName: el.originalname,
      filePath: el.path,
      fileType: el.mimetype,
      fileSize: el.size,
    };

    // console.log(req.files);
    photos.push(file);
  });

  // });
  if (!req.body.user) req.body.user = req.user.id;
  // console.log(req.body.user);
  await Product.create({
    name: req.body.name,
    title: req.body.title,
    cheapestPrice: req.body.cheapestPrice,
    rating: req.body.rating,
    photos: photos,
    description: req.body.description,
    type: req.body.type,
    address: req.body.address,
    city: req.body.city,
    user: req.body.user,
  });

  res.status(201).send({ message: "Product created successfully" });
  next();
});

exports.getProducts = catchAsync(async (req, res, next) => {
  const { min, max, ...others } = req.query;
  const limit = req.query.limit * 1 || 2;
  const page = req.query.page * 1 || 1;
  const skip = (page - 1) * limit;
  let products;
  let documentsCount;
  if (min || max) {
    products = await Product.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lte: max | 9999 },
    }).limit(req.query.limit);
    console.log("1st");
  } else if (req.query.page) {
    products = await Product.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lte: max | 9999 },
    })
      .skip(skip)
      .limit(limit);
    documentsCount = await Product.countDocuments({
      rating: { $gte: 1 },
    });
    console.log("2st", documentsCount);
  }
  const search = req.query.search
    ? {
        name: {
          $regex: req.query.search,
          $options: "i",
        },
      }
    : {};

  products = await Product.find(search);

  //  else {
  //   products = await Product.find({
  //     ...others,
  //   });
  //   console.log("3st");
  // }
  if (!products) return next(new AppError(400, "Product not found"));
  // if (!others) return next(new AppError(400, "No search results found"));
  // console.log(Product.count());
  res.status(200).json({
    status: "success",
    resultsPerPage: products.length,
    results: documentsCount,
    remaining: (documentsCount - products.length) / products.length,
    page,
    products,
  });
  next();
});
exports.getCheapestProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find()
    .sort({ cheapestPrice: "1" })
    .limit(req.query.limit);
  if (!products) return next(new AppError(400, "Product not found"));
  res.status(200).json({
    status: "success",
    result: products.length,
    products,
  });
  next();
});

exports.top3Products = catchAsync(async (req, res, next) => {
  const products = await Product.find()
    .sort({ cheapestPrice: "-1" })
    .limit(req.query.limit);

  if (!products) return next(new AppError(400, "Product not found"));
  res.status(200).json({
    status: "success",
    result: products.length,
    products,
  });
  next();
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate("reviews");
  if (!product) return next(new AppError(400, "Product not found"));
  res.status(200).json({
    status: "success",
    product,
  });
  next();
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!product) return next(new AppError(400, "Product not found"));
  res.status(200).json({
    status: "success",
    product,
  });
  next();
});

exports.deleteProduct = async (req, res, next) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Product deleted successfully",
  });
  next();
};

exports.myProducts = catchAsync(async (req, res, next) => {
  const [_id] = await User.find({ _id: req.user.id });
  const products = await Product.find({ user: _id._id });
  // console.log(myProducts);
  res.status(200).json({
    results: products.length,
    products,
  });
  next();
});

exports.getRelatedProducts = catchAsync(async (req, res, next) => {
  const [prodId] = await Product.find({
    _id: req.params.relatedProdId,
  });
  const products = await Product.find({
    type: prodId.type,
    _id: { $ne: req.params.relatedProdId },
  });
  res.status(200).json({
    results: products.length,
    products,
  });
  next();
});

exports.getReviewsOnProduct = catchAsync(async (req, res, next) => {
  const reviews = await Product.find();
  res.status(200).json({
    re: reviews,
  });
  next();
});
