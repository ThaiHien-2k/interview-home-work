const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
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

  title: {
    type: String,
    required: [true],
  },

  content: {
    type: String,
    required: [true],
  },

  tags: {
    type: Object,
    required: [true],
  },

  created_at: {
    type: String,
  },
});

module.exports = mongoose.model("Post", postSchema);
