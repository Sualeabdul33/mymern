const express = require("express");
const router = express.Router({ mergeParams: true });

const reviewController = require("../controllers/review");
const authController = require("../controllers/auth");

router
  .route("/")
  .post(authController.protect, reviewController.createReview)
  .get(reviewController.getReviews);

router
  .route("/:id")
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);
module.exports = router;
