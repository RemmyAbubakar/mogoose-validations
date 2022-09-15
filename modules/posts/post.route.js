const {
  getAllPost,
  createPost,
  getSinglePost,
  updatePost,
  deletePost,
} = require("./post.controller");
const { authRequired } = require("../middlewares/authRequired")


const router = require("express").Router;

const postsRouter = router();

postsRouter.route("/")
.all(authRequired)
.get(getAllPost).post(createPost);


postsRouter
  .route("/:postId")
  .all(authRequired)
  .get(getSinglePost)
  .patch(updatePost)
  .delete(deletePost);

module.exports = postsRouter;
