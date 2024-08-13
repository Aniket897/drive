import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;

    if (!username) {
      return resp.status(400).json({
        message: "please provide username",
      });
    }

    if (!email) {
      return resp.status(400).json({
        message: "please provide email",
      });
    }

    if (!password) {
      return resp.status(400).json({
        message: "please provide password",
      });
    }

    // cheking if user alredy exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return resp.status(400).json({
        message: "Email aleady in use",
      });
    }

    const newUser = await User.create({
      email,
      password,
      username,
    });

    const payload = {
      id: newUser._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string);

    resp.status(200).json({
      userData: {
        email,
        username,
        avatar: newUser.avatar,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal server error",
    });
  }
};

export const login = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return resp.status(400).json({
        message: "please provide email",
      });
    }

    if (!password) {
      return resp.status(400).json({
        message: "please provide password",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return resp.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
      return resp.status(400).json({
        message: "Invalid credentials",
      });
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string);

    resp.status(200).json({
      userData: {
        email,
        username: user.username,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal server error",
    });
  }
};
