const express = require("express");
const dotenv = require("dotenv");
const app = express();
const path = require("path");
dotenv.config();
// const path = require("path");

const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const reviewRouter = require("./routes/review");

const AppError = require("./utils/appError");
const handleError = require("./controllers/error");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

app.use(cors());
app.use(express.json());

app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);

app.use((req, res, next) => {
  next(new AppError(404, `We cannot find ${req.originalUrl} on this server.`));
});

app.use(handleError);
module.exports = app;
