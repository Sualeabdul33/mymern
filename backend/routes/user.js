const router = require("express").Router();

const userController = require("../controllers/user");
const authController = require("../controllers/auth");

router.post(
  "/register",
  userController.upload.single("photo"),
  authController.register
);
router.post("/login", authController.login);
router.post("/forgotpassword", authController.forgotPassword);
router.patch("/resetpassword/:token", authController.resetPassword);

router.patch(
  "/updatepassword",
  authController.protect,
  authController.updatePassword
);
router.get(
  "/me",
  authController.protect,
  userController.getMe,
  userController.getUser
);
router.patch(
  "/updateme",
  authController.protect,
  userController.upload.single("photo"),
  userController.updateMe
);
router.route("/").get(userController.getUsers).post(userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
