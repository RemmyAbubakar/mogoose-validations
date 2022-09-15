const {Schema, model} = require("mongoose")

const postSchema =
  ({
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
   author: {
         type: Schema.Types.ObjectId,
         required: true,
    },
    likedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ]
  });



module.exports = model("Post", postSchema);