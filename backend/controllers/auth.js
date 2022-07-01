const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { promisify } = require("util");
const sendEmail = require("../utils/email");
const crypto = require("crypto");

const signToken = (id) => {
  return jwt.sign({ id, isAdmin: true }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const cookieOptions = {
  expire: process.env.COOKIE_EXPIRES + 24 * 60 * 60 * 1000,
  httpOnly: true,
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.cookie("token", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};
exports.register = catchAsync(async (req, res, next) => {
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
    phone: req.body.phone,
  });
  const token = signToken(user._id);
  res.status(201).json({
    status: "success",
    token,
    user,
  });
  next();
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password: pass } = req.body;
  if (!username || !pass)
    return next(new AppError(400, "please enter your username and password."));

  const user = await User.findOne({ username }).select("+password");
  if (!user || !(await user.correctPassword(pass, user.password))) {
    return next(new AppError(400, "Incorrect email or password."));
  }
  const { password, ...others } = user._doc;
  createSendToken(others, 200, res);
  next();
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.token && req.headers.token.startsWith("Bearer")) {
    token = req.headers.token.split(" ")[1];
  }

  if (!token) return next(new AppError(400, "You're not logged in."));
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    return next(
      new AppError(400, "The token belonging to this user does not exist.")
    );

  req.user = currentUser;
  next();
});

exports.authorize = catchAsync(async (req, res, next) => {
  if (!req.user.isAdmin)
    return next(
      new AppError(400, "You're not allowed to perform this action.")
    );
  next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(new AppError(400, "There're no user with that email."));
  const resetToken = user.resetToken();
  await user.save({ validateBeforeSave: false });
  const resetTokenUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/users/resetpassword${resetToken}`;
  const message = `Do you forget your password? use this link below if you forget your password
  ${resetTokenUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token",
      message,
    });

    res.status(200).json({
      status: "success",
      message: `An email has been sent to ${user.email}`,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }

  next();
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: new Date(Date.now()) + 24 * 60 * 60 * 1000 },
  });

  if (!user) return next(new AppError(400, "Invalid token,"));

  user.password = req.body.password;
  await user.save({ validateBeforeSave: false });
  const { password, ...others } = user._doc;
  createSendToken(others, 200, res);
  next();
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  if (
    !user ||
    !(await user.correctPassword(req.body.oldPassword, user.password))
  ) {
    return next(new AppError(404, "Your current password is incorrect."));
  }

  user.password = req.body.password;
  await user.save();
  const { password, ...others } = user._doc;
  createSendToken(others, 200, res);
  nex();
});
