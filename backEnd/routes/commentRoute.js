const router = require("express").Router();
const commentController = require("../controllers/commentController");

router.route("/").get(commentController.getAllComments);
router.route("/:id").get(commentController.getSingleComment);
router.route("/new").post(commentController.createComment);
router.route("/:id").delete(commentController.deleteComment);
router.route("/:id").put(commentController.updateComment);

module.exports = router;
