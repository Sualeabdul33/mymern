const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please provide username"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "please provide email"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: Number,
      required: [true, "please provide your phone number"],
    },
    password: {
      type: String,
      required: [true, "please provide password"],
      select: false,
    },
    photo: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};
// userSchema.methods.confirmPassword = async function (pass1, pass) {
//   return await bcrypt.compare(pass1, pass);
// };

userSchema.methods.resetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
module.exports = mongoose.model("User", userSchema);
