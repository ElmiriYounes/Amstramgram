import express, { Express, NextFunction, Request, Response } from "express";
const User = require("../models/User");

interface IUsersCtrl {
  login?: (req: Request, res: Response) => void;
}

const usersCtrl: IUsersCtrl = {};

usersCtrl.login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (user) {
      const matchPassword = await user.matchPassword(password);
      if (matchPassword) {
        const accessToken: string = await user.generateAuthToken();
        res.status(202).send(accessToken);
      } else {
        res.status(401).send('password or user incorrect');
      }
    } else {
      res.status(401).send('password or user incorrect');
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = usersCtrl;
