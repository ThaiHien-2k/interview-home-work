const Post = require("../models/posts");

exports.createPost = async (req, res, next) => {
  const post = await Post.create(req.body);
  res.status(200).json({
    success: true,
    data: post,
  });
};
// update an existing post
exports.updatePost = async (req, res, next) => {
  if (!req.params.id) {
    return next(("Post Not Found", 400));
  }
  let post = await Post.findById(req.params.id);
  if (!post) {
    return next(("post Not Found", 200));
  }

  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    post,
  });
};

// delete an existing post
exports.deletePost = async (req, res, next) => {
  if (!req.params.id) {
    return next(("Post Not Found", 400));
  }
  let post = await Post.findById(req.params.id);
  if (!post) {
    return next(("post Not Found", 200));
  }
  await post.remove();
  res.status(200).json({
    success: true,
    message: "post deleted",
  });
};

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find();
  const data = posts.map((item, index) => {
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

exports.getSinglePost = async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler("Post Not Found", 400));
  }
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler("post Not Found", 200));
  }
  res.status(200).json({
    data: post,
  });
};
