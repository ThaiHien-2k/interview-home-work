const User = require("../models/users");

exports.createUser = async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(200).json({
    success: true,
    data: user,
  });
};
// update an existing user
exports.updateUser = async (req, res, next) => {
  if (!req.params.id) {
    return next(("User Not Found", 400));
  }
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(("user Not Found", 200));
  }

  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    user,
  });
};

// delete an existing user
exports.deleteUser = async (req, res, next) => {
  if (!req.params.id) {
    return next(("User Not Found", 400));
  }
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(("user Not Found", 200));
  }
  await user.remove();
  res.status(200).json({
    success: true,
    message: "user deleted",
  });
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  const data = users.map((item, index) => {
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

exports.getSingleUser = async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler("User Not Found", 400));
  }
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("user Not Found", 200));
  }
  res.status(200).json({
    data: user,
  });
};
