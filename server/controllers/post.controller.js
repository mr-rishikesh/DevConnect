import Post from "../models/post.model.js";
import cloudinary from "../utils/cloudinary.js";
import mongoose from "mongoose";

// Function takes the following parameters:
// - title, description, content, tags
// - requires frontend to upload a coverImg for the blog.
// - posterId is extracted from the request object.

// Returns:
// - JSON response with success status and created post data

// Throws:
// - 400: If invalid post data is provided
// - 500: If server error occurs during post creation
export const createPost = async (req, res) => {
  try {
    const { title, description, content, tags } = req.body;
    if (!title?.trim()) return res.status(400).json({ error: "Title is required" });
    if (title.trim().length > 200) return res.status(400).json({ error: "Title too long" });

    if (!description?.trim()) return res.status(400).json({ error: "Description is required" });
    if (description.trim().length > 500) return res.status(400).json({ error: "Description too long" });

    if (!content?.trim()) return res.status(400).json({ error: "Content is required" });
    if (content.trim().length > 50000) return res.status(400).json({ error: "Content too long" });

    // Tags validation
    let processedTags = [];

    if (tags && typeof tags === "string") {
      processedTags = tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => tag.length > 0);

      if (processedTags.length > 10) {
        return res.status(400).json({ success: false, message: "You can provide up to 10 tags only" });
      }
    } else if (tags && !typeof tags === "string") {
      return res.status(400).json({ success: false, message: "Tags must be a comma-separated string" });
    }

    if (!req.file) return res.status(400).json({ success: false, message: "Cover image is required" });

    const coverImg = req.file;
    const maxFileSize = 5 * 1024 * 1024;
    if (coverImg.size > maxFileSize) {
      return res.status(400).json({ success: false, message: "Image exceeds 5MB limit" });
    }

    const base64Image = `data:${coverImg.mimetype};base64,${coverImg.buffer.toString("base64")}`;

    let coverImgSrc;
    try {
      const uploadRes = await cloudinary.uploader.upload(base64Image, { folder: "posts" });
      coverImgSrc = uploadRes.secure_url;
    } catch (uploadError) {
      console.error("Cloudinary error:", uploadError);
      return res.status(500).json({ success: false, message: "Image upload failed" });
    }

    const post = await Post.create({
      title: title.trim(),
      description: description.trim(),
      content: content.trim(),
      coverImg: coverImgSrc,
      posterId: req.user._id,
      tags: processedTags,
    });

    // removing items that are not meant to be shared
    post.upvotedBy = undefined;
    post.upvotes = undefined;
    post.__v = undefined;

    res.status(201).json({
      success: true,
      message: "Post uploaded successfully!",
      post,
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: "Something wrong while creating post" })
  }
};



// This function takes the following parameters:
// - page: The page number
// - limit: The number of posts per page
// - author: The author of the posts
//      - use 'me' for posts of the loggedIn user.
//      - else provide user id for posts of other users.
//      - if not provided, all posts will be fetched.

// - search: The search query
//      - search by title, content, or tags

// Returns:
// - JSON response with success status and posts data
// Throws:
// - 400: If invalid pagination params are provided
// - 500: If server error occurs during post fetching

export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (page < 1 || limit < 1 || limit > 50) {
      return res.status(400).json({ success: false, error: "Invalid pagination params" });
    }

    let filter = {};

    // Handle filtering by author
    if (req.query.author) {
      if (req.query.author === "me") {
        if (!req?.user?.id) {
          return res.status(401).json({ success: false, error: "Unauthorized" });
        }
        filter.posterId = req.user._id;
      } else if (mongoose.Types.ObjectId.isValid(req.query.author)) {
        filter.posterId = req.query.author;
      } else {
        return res.status(400).json({ success: false, error: "Invalid author ID" });
      }
    }

    // Handle search by title, content, or tags
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, "i");
      filter.$or = [
        { title: searchRegex },
        { content: searchRegex },
        { tags: searchRegex }
      ];
    }

    const totalPosts = await Post.countDocuments(filter);
    const totalPages = Math.ceil(totalPosts / limit);

    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-content -upvotedBy")
      .lean();

    res.status(200).json({
      success: true,
      posts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Fetch posts error:", error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};


// Function takes the following parameters:
// - id: The ID of the post to fetch

// Returns:
// - JSON response with success status and post data

// Throws:
// - 400: If invalid post ID is provided
// - 404: If post is not found
// - 500: If server error occurs during post fetching

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid post ID" });
    }

    const post = await Post.findById(id)
      .select("-upvotedBy")
      .lean();

    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    res.status(200).json({ success: true, message: "Post fetched", post });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// Function takes the following parameters:
// - id: The ID of the post to delete

// Returns:
// - JSON response with success status and post data

// Throws:
// - 400: If invalid post ID is provided
// - 404: If post is not found
// - 500: If server error occurs during post deletion

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post" });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    if (req.user._id !== post.posterId.toString()) {
      return res.status(403).json({ success: false, message: "You are not authorized to delete this post." });
    }

    await post.deleteOne();

    res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("Failed to delete post due to the following error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// Function takes the following parameters:
// - id: The ID of the post to edit
// - title: The title of the post
// - description: The description of the post
// - content: The content of the post
// - tags: The tags of the post

// Returns:
// - JSON response with success status and post data

// Throws:
// - 400: If invalid post ID is provided
// - 404: If post is not found
// - 500: If server error occurs during post editing

export const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, content, tags } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Post" });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ success: false, error: "Post not found" });
    }

    if (req.user._id !== post.posterId.toString()) {
      return res.status(403).json({ success: false, error: "You are not authorized to edit this post" });
    }

    // ---------------Input validations---------------
    if (title?.trim()) {
      if (title.trim().length > 200) {
        return res.status(400).json({ success: false, error: "Title too long" });
      }
      post.title = title.trim();
    }

    if (description?.trim()) {
      if (description.trim().length > 500) {
        return res.status(400).json({ success: false, error: "Description too long" });
      }
      post.description = description.trim();
    }

    if (content?.trim()) {
      if (content.trim().length > 50000) {
        return res.status(400).json({ error: "Content too long" });
      }
      post.content = content.trim();
    }

    if (tags) {
      if (!Array.isArray(tags)) {
        return res.status(400).json({ error: "Tags must be an array" });
      }

      const processedTags = tags
        .map(tag => typeof tag === "string" ? tag.trim().toLowerCase() : null)
        .filter(tag => tag && tag.length > 0);

      if (processedTags.length > 10) {
        return res.status(400).json({ error: "You can provide up to 10 tags only" });
      }

      post.tags = processedTags;
    }

    // Optional image update
    if (req.file) {
      const coverImg = req.file;
      const maxFileSize = 5 * 1024 * 1024;
      if (coverImg.size > maxFileSize) {
        return res.status(400).json({ error: "Image exceeds 5MB limit" });
      }

      const base64Image = `data:${coverImg.mimetype};base64,${coverImg.buffer.toString("base64")}`;

      try {
        const uploadRes = await cloudinary.uploader.upload(base64Image, { folder: "posts" });
        post.coverImg = uploadRes.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary error:", uploadError);
        return res.status(500).json({ success: false, error: "Image upload failed" });
      }
    }

    await post.save();

    res.status(200).json({ success: true, message: "Post updated successfully", post });
  } catch (error) {
    console.error("Failed to edit the post due to following error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};


// Function takes the following parameters:
// - id: The ID of the post to upvote

// first check if it's already upvoted if yes, 
//  - remove the user from upvotedBy and decrement upvotes
//  - else add the user to upvotedBy and increment upvotes

// Returns:
// - JSON response with success status and post data

// Throws:
// - 400: If invalid post ID is provided
// - 404: If post is not found
// - 500: If server error occurs during upvoting

export const toggleUpvotePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post" });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user has already upvoted
    const userUpvoteIndex = post.upvotedBy?.findIndex(upvote =>
      upvote.userId.toString() === req.user._id.toString()
    ) ?? -1;

    if (userUpvoteIndex !== -1) {
      // User has already upvoted, so remove the upvote
      post.upvotes = Math.max(0, post.upvotes - 1);
      post.upvotedBy.splice(userUpvoteIndex, 1);
    } else {
      // User hasn't upvoted yet, so add their upvote
      post.upvotes = (post.upvotes ?? 0) + 1;
      post.upvotedBy = [...(post.upvotedBy ?? []), { userId: req.user._id }];
    }

    await post.save();

    // remove upvotedBy from response
    const postObj = post.toObject();
    delete postObj.upvotedBy;

    const wasUpvoted = userUpvoteIndex !== -1;
    res.status(200).json({
      success: true,
      message: wasUpvoted ? "Post upvote removed" : "Post upvoted successfully",
      post: postObj
    });
  } catch (error) {
    console.error("Failed to toggle upvote the post due to following error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

