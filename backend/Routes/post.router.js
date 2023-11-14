const express = require("express");
const { setposts, getPosts, editPosts, deletePosts, likePosts, dislikePosts } = require("../controlers/post.controler");
const router = express.Router();

router.get("/", getPosts);

router.post("/", setposts);

router.put("/:id", editPosts);

router.delete("/:id", deletePosts);

router.patch("/post-like/:id", likePosts);

router.patch("/post-dislike/:id", dislikePosts)

module.exports = router;
