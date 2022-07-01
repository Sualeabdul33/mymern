const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/user");
const multer = require("multer");
const Product = require("../models/product");
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/users");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now() - 120}-${Date.now()}-${file.originalname}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError(400, "upload only images"), false);
  }
};

exports.upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.createUser = catchAsync(async (req, res, next) => {
  await User.create(req.body);
  res.status(201).json({
    status: "success",
    message: "User created successfully",
  });
  next();
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  if (!users) return next(new AppError(400, "User not found"));
  res.status(200).json({
    status: "success",
    results: users.length,
    users,
  });
  next();
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError(400, "User not found"));
  res.status(200).json({
    status: "success",
    user,
  });
  next();
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!user) return next(new AppError(400, "User not found"));
  res.status(200).json({
    status: "success",
    user,
  });
  next();
});

exports.deleteUser = async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
  });
  next();
};

const filterObj = (obj, ...fields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (fields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, "username", "email", "photo");
  if (req.file) filteredBody.photo = req.file.filename;
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    updatedUser,
  });
  next();
});

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});
