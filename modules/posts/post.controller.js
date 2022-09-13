const Post = require("./post.model")

const getAllPost = async (req, res) => {
  const posts = await Post.find({});
  res.status(200).json({ posts });
};

const getSinglePost = async (req, res) => {
  const {postId} = req.params;
  const post = await Post.findById(postId);

  res.status(200).json({post});
}


const createPost = async (req, res) => {
  const { title, body, published } = req.body;

  const post = await Post.create({
   title,
   body, 
   published,
  });

  res.status(201).json({ post });
};


const updatePost = async (req, res) => {
const {postId} = req.params;
 const post = await Post.findByIdAndUpdate(
   postId,
   {
     ...req.body,
   },
   { new: true }
 );

 res.status(200).json({ post });
}


const deletePost = async (req, res) => {
const {postId} = req.params;
await Post.findByIdAndDelete(postId);

res.status(200).json({ msg: "Post deleted successfully" });
};


module.exports = {
    getAllPost,
    createPost,
    getSinglePost,
    updatePost,
    deletePost
}

