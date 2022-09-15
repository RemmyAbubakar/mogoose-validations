const Post = require("./post.model");

const verifyAuthour = async (req, res) => {
  let post = await Post.findById(req.params.postId);
  if (post._id.toString() !== req.user.id) {
    return res
      .status(406)
      .json({ error: "You are not permitted to perform this operation" });
  }
};

const getAllPost = async (req, res) => {
  const posts = await Post.find({});
  res.status(200).json({ posts });
};

const getallPostsByUser = async (req, res) => {
  const posts = await Post.find({ author: req.user.id });

  res.status(200).json({ posts });
};

const getSinglePost = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);

  res.status(200).json({ post });
};

const createPost = async (req, res) => {
  const { title, body, published } = req.body;

  const post = await Post.create({
    title,
    body,
    published,
    author: req.user.id,
  });

  res.status(201).json({ post });
};

const updatePost = async (req, res) => {
  const { postId } = req.params;

  //checks
  await verifyAuthour(req, res);

  const post = await Post.findByIdAndUpdate(
    postId,
    {
      ...req.body,
    },
    { new: true }
  );

  res.status(200).json({ post });
};

const deletePost = async (req, res) => {
  const { postId } = req.params;

  await verifyAuthour(req, res);

  await Post.findByIdAndDelete(postId);
  res.status(200).json({ msg: "Post deleted successfully" });
};

module.exports = {
  getAllPost,
  getallPostsByUser,
  createPost,
  getSinglePost,
  updatePost,
  deletePost,
};
