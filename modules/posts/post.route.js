const { getAllPost, createPost } = require("./post.controller");
const router = require("express").Router


const postsRouter = router()

postsRouter.route("/").get(getAllPost).post(createPost)

module.exports = postsRouter;