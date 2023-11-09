const router = require("express").Router();
const postController = require("../controllers/postController");

router.route("/").get(postController.getAllPosts);
router.route("/:id").get(postController.getSinglePost);
router.route("/new").post(postController.createPost);
router.route("/:id").delete(postController.deletePost);
router.route("/:id").put(postController.updatePost);

module.exports = router;
