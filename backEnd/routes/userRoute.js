const router = require("express").Router();
const userController = require("../controllers/userController");

router.route("/").get(userController.getAllUsers);
router.route("/:id").get(userController.getSingleUser);
router.route("/new").post(userController.createUser);
router.route("/:id").delete(userController.deleteUser);
router.route("/:id").put(userController.updateUser);

module.exports = router;
