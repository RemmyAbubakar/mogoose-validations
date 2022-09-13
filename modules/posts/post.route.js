const {
  getAllPost,
  createPost,
  getSinglePost,
  updatePost,
  deletePost,
} = require("./post.controller");
const router = require("express").Router;

const postsRouter = router();

postsRouter.route("/").get(getAllPost).post(createPost);
postsRouter
  .route("/:postId")
  .get(getSinglePost)
  .patch(updatePost)
  .delete(deletePost);

module.exports = postsRouter;
