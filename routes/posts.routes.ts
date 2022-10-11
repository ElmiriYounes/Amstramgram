import { Router } from "express";
const router = Router();
const verify = require("../middlewares/verify.middleware");
const Post = require('../models/Post')

const { add, getAll, getMyPosts, deletePost } = require("../controllers/posts.controller");

router.post("/posts/add", verify,  add);

router.post("/posts/deletePost", verify,  deletePost);

router.get("/posts/getAll", verify,  getAll);

router.get("/posts/getMyPosts", verify,  getMyPosts);

// router.get('/posts', async (req,res)=>{
//     const posts = await Post.find();
//     res.send(posts);
    
// })

module.exports = router;