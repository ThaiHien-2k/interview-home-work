const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  ObjectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true],
  },
  id: {
    type: String,
    required: [true],
  },
  username: {
    type: String,
    required: [true, "Please enter username name"],
  },

  password: {
    type: String,
    required: [true, "Please enter password name"],
  },

  name: {
    type: String,
    required: [true, "Please enter your name"],
  },

  dob: {
    type: String,
    required: [true],
  },

  created_at: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
