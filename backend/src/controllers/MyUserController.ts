import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;

     // Validate required fields
     if (!auth0Id) {
      return res.status(400).json({ message: "auth0Id is required" });
    }

    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      return res.status(200).send(existingUser);
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log("createCurrentUser error", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export default {
  createCurrentUser,
};