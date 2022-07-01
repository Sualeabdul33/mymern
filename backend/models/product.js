const mongoose = require("mongoose");
const slugify = require("slugify");
const { Schema } = mongoose;
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    type: {
      type: String,
      lowercase: true,
      enum: [
        "sneaker",
        "others",
        "fruit",
        "phone",
        "dress",
        "electronic",
        "computer",
      ],
      required: [true, "select which category of your product"],
    },

    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minLength: [15, "Product description must be at least 15 characters"],
      maxLength: [
        100,
        "Product description must be greater than 100 characters",
      ],
    },
    address: {
      type: String,
      required: true,
    },

    distance: {
      type: Number,
      // required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    cheapestPrice: {
      type: Number,
      required: true,
    },

    photos: [Object],
    city: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  // {
  //   timestamp: true,
  // },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// productSchema.pre("save", function (next) {
//   this.slug = slugify(this.slug, { lower: true });
//   next();
// });

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "username phone",
  });
  next();
});

// productSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "reviews",
//     select: "email username",
//   });
//   next();
// });

productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

module.exports = mongoose.model("Product", productSchema);
