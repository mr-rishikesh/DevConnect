import express from "express"
import { createPost, getPosts, getPostById, deletePost, toggleUpvotePost, editPost } from "../controllers/post.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import upload from "../utils/upload.js";

const postRouter = express.Router();

// create and get posts
postRouter.post("/create-post", protectRoute, upload.single("coverImg"), createPost)
postRouter.get("/", protectRoute, getPosts)
postRouter.get("/:id", protectRoute, getPostById)

// delete and edit functionality
postRouter.delete("/delete/:id", protectRoute, deletePost)
postRouter.put("/edit/:id", protectRoute, upload.single("coverImg"), editPost)

// handle upvote logic
postRouter.put("/toggle-upvote/:id", protectRoute, toggleUpvotePost)


export default postRouter