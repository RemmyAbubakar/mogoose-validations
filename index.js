const express = require("express");
const postsRouter = require("./modules/posts/post.route");
const { dbConnect } = require("./config/dbConnect");
const { authRouter } = require("./modules/users/auth.route")


const app = express();



app.all("/", (req, res) => {
    res.status(200).send("Welcome to my server. use /posts to get all posts")
})

app.use(express.json())

app.use("/auth", authRouter)
app.use("/posts", postsRouter)

async function start(){
await dbConnect();

app.listen(4000, () => {
    console.log("🚀Server up and running on port http://localhost:4000")
});
};

start();