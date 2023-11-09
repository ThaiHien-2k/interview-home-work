const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  ObjectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true],
  },
  id: {
    type: String,
    required: [true],
  },
  owner: {
    type: String,
    required: [true],
  },
  post: {
    type: String,
    required: [true],
  },

  content: {
    type: String,
    required: [true],
  },

  created_at: {
    type: String,
  },
});

module.exports = mongoose.model("Comments", commentSchema);
