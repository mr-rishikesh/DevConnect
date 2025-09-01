import mongoose from "mongoose";


// The post schema is defined here. It contains the following fields:
// - posterId: The ID of the user who posted the post.
// - title: The title of the post.
// - description: A short description of the post.
// - content: The content of the post.
// - image: The URL of the image associated with the post.
// - upvotedBy: An array of objects, each containing the ID of a user who has upvoted the post.
// - upvotes: The total number of upvotes the post has received.
// - tags: An array of strings, each representing a tag associated with the post.

const postSchema = mongoose.Schema({
    posterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    coverImg: {
        type: String,
        required: true
    },
    upvotedBy: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        }
    ],
    upvotes: {
        type: Number,
        default: 0
    },
    tags: [String],
}, { timestamps: true })

const Post = mongoose.model("Post", postSchema)

export default Post
