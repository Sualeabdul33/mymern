const AppError = require("../utils/appError");
const sendErrorDev = (err, res) => {
  if (err)
    return res.status(err.statusCode).json({
      status: err.status,
      err,
      message: err.message,
      stack: err.stack,
    });
};

const sendErrorProd = (err, res) => {
  if (err) {
    return res.status(err.statusCode).json({
      message: "Something went wrong, please try again.",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    if (err.code === 11000)
      return next(new AppError(400, "user already exists."));
    sendErrorDev(err, res);
  }
  if (process.env.NODE_ENV === "production") {
    console.log(err);
    if (err.code === 11000)
      return next(new AppError(400, "user already exists."));
    sendErrorProd(err, res);
  }
  next();
};
