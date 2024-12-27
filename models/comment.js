const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
const Comment = model("comment", commentSchema);
module.exports = Comment;
