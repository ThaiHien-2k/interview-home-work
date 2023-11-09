const Comment = require("../models/comments");

exports.createComment = async (req, res, next) => {
  const comment = await Comment.create(req.body);
  res.status(200).json({
    success: true,
    data: comment,
  });
};
// update an existing comment
exports.updateComment = async (req, res, next) => {
  if (!req.params.id) {
    return next(("Comment Not Found", 400));
  }
  let comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(("comment Not Found", 200));
  }

  comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    comment,
  });
};

// delete an existing comment
exports.deleteComment = async (req, res, next) => {
  if (!req.params.id) {
    return next(("Comment Not Found", 400));
  }
  let comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(("comment Not Found", 200));
  }
  await comment.remove();
  res.status(200).json({
    success: true,
    message: "comment deleted",
  });
};

exports.getAllComments = async (req, res) => {
  const comments = await Comment.find();
  const data = comments.map((item, index) => {
    const { _id: ObjectId, id, owner, title, content, tags, createdAt } = item;
    const newItem = {
      id,
      owner,
      title,
      content,
      tags,
      createdAt,
    };
    return newItem;
  });
  res.status(200).json({
    success: true,
    data,
  });
};

exports.getSingleComment = async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler("Comment Not Found", 400));
  }
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(new ErrorHandler("comment Not Found", 200));
  }
  res.status(200).json({
    data: comment,
  });
};
