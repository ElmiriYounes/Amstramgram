import express, { Express, Request, Response } from "express";
const Post = require("../models/Post");
const User = require("../models/User");
const fs = require("fs");

interface IPostsCtrl {
  add?: (req: Request, res: Response) => void;
  deletePost?: (req: Request, res: Response) => void;
  getAll?: (req: Request, res: Response) => void;
  getMyPosts?: (req: Request, res: Response) => void;
}

const postsCtrl: IPostsCtrl = {};

postsCtrl.add = async (req: Request, res: Response) => {
  const { localisation, image, imageType } = req.body;

  try {
    const user = await User.findOne({ username: req.user.username });

    if (user) {
      const newPost = await new Post({
        localisation: localisation,
        img: {
          data: image,
          contentType: imageType,
        },
        username: req.user.username,
      });
      await newPost.save();
      res.status(202).send("post published successfully");
    } else {
      res.status(401).send("user doesn't exist");
    }
  } catch (error) {
    console.error(error);
  }
};

postsCtrl.deletePost = async (req: Request, res: Response) => {
  try {
    const postDelete = await Post.deleteOne({ _id: req.body.id });
    
    res.status(202).send("deleted successfully");
  } catch (error) {
    console.log(error);
  }
};

postsCtrl.getAll = async (req: Request, res: Response) => {
  console.log(req.user.username);

  try {
    const user = await User.findOne({ username: req.user.username });

    if (user) {
      const posts = await Post.find();
      res.status(202).send(posts);
    } else {
      res.status(401).send("user doesn't exist");
    }
  } catch (error) {
    console.error(error);
  }
};

postsCtrl.getMyPosts = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.user.username });

    if (user) {
      const posts = await Post.find({ username: req.user.username });
      res.status(202).send(posts);
    } else {
      res.status(401).send("user doesn't exist");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = postsCtrl;
