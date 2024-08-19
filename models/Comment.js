const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    //   required: true,
    },

    blog_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog",
        // required: true,
    },

    // image: {
    //   type: String,
    //   default:'/assets/default/blog_img.jpg'
    // },

    comment: {
      type: String,
      required: [true, "please enter comment description"],
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
