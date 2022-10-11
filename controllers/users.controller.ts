import express, { Express, Request, Response } from "express";
const User = require("../models/User");
const Post = require("../models/Post");

interface IUsersCtrl {
  register?: (req: Request, res: Response) => void;
  getMyUsername?: (req: Request, res: Response) => void;
  getMyAvatar?: (req: Request, res: Response) => void;
  update?: (req: Request, res: Response) => void;
  deleteUser?: (req: Request, res: Response) => void;
}

const usersCtrl: IUsersCtrl = {};

usersCtrl.register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (user) {
      res.status(401).send("user already exists");
    } else {
      const newUser: any = new User({ username, password });

      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      res.status(202).send("user registered successfuly");
    }
  } catch (error) {
    console.error(error);
  }
};

usersCtrl.getMyUsername = async (req: Request, res: Response) => {
  res.status(202).send(req.user.username);
};

usersCtrl.getMyAvatar = async (req: Request, res: Response) => {
  let user = await User.findOne({ username: req.user.username });
  res.status(202).send(user.avatar);
};

usersCtrl.update = async (req: Request, res: Response) => {
  try {
    let user = await User.findOne({ username: req.user.username });

    req.body.target === "password" &&
      (user.password = await user.encryptPassword(req.body.value));
    req.body.target === "username" && (user.username = req.body.value);
    req.body.target === "avatar" && (user.avatar = req.body.value);

    try {
      const userUpdated = await user.save();

      // after editing username => update newusername in the posts of him
      var refreshToken: string = await userUpdated.generateAuthToken();
      // if(req.body.value === "username"){
      //   refreshToken =  await userUpdated.generateAuthToken();
      // }
      console.log(refreshToken);

      if (req.body.target === "username") {
        const posts = await Post.find({ username: req.user.username });
        posts.forEach((post: any) => {
          post.username = userUpdated.username;
          post.save();
        });
      }

      // await posts.updateMany({}, { username: userUpdated.username });
      // await posts.save();
      res.status(202).send({
        username: userUpdated.username,
        msg: "updated successfully",
        token: refreshToken,
      });
    } catch (error) {
      res.status(404).send("error server, try again");
    }
  } catch (error) {
    console.error(error);
  }
};

usersCtrl.deleteUser = async (req: Request, res: Response) => {
  try {
    let user = await User.findOne({ username: req.user.username });
    let posts = await Post.find({ username: req.user.username });

    if (user) {
      try {
        posts.forEach(async (post:any) => {
          await post.delete();
        });
        await user.delete();
        res.status(202).send("deleted successfully");
      } catch (error) {
        console.log(error);
        res.status(404).send("delete failed");
      }
    } else {
      res.status(404).send("user doesn't exist");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = usersCtrl;
