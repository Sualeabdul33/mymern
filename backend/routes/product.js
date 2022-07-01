const router = require("express").Router();

const productController = require("../controllers/product");
const authController = require("../controllers/auth");
const multer = require("../controllers/multer");

const reviewRouter = require("../routes/review");

router.use("/:productId/reviews", reviewRouter);
router.get("/top-3", productController.top3Products);
router.get("/featured", productController.getCheapestProducts);
router.get("/:prodId/reviews", productController.getReviewsOnProduct);
router.get("/myproducts", authController.protect, productController.myProducts);
router.get(
  "/:relatedProdId/relatedproducts",
  productController.getRelatedProducts
);

router
  .route("/")
  .post(
    authController.protect,
    multer.multipleUploads,
    productController.createProduct
  )
  .get(productController.getProducts);

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);
module.exports = router;
