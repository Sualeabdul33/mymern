const mongoose = require("mongoose");
const { Schema } = mongoose;
const reviewSchema = new Schema(
  {
    review: {
      type: String,
      required: [true, "Review cannot be empty"],
    },
    rating: {
      type: Number,
      required: [true, "Rating cannot be negative or zero"],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "username email photo",
  });
  next();
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
