import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import mongoose from "mongoose";
import cloudinary from "cloudinary";


const uploadImage = async (file: Express.Multer.File) => {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
  
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    return { url: uploadResponse.url, publicId: uploadResponse.public_id };
  };

  const getMyRestaurant = async (req: Request, res: Response) => {
    try {
      const restaurant = await Restaurant.findOne({ user: req.userId });
      if (!restaurant) {
        return res.status(404).json({ message: "restaurant not found" });
      }
      res.json(restaurant);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Error fetching restaurant" });
    }
  };

const createMyRestaurant = async (req: Request, res: Response) => {
    try {
      const existingRestaurant = await Restaurant.findOne({ user: req.userId });
  
      if (existingRestaurant) {
        return res
          .status(409)
          .json({ message: "User restaurant already exists" });
      }

      // to make single user create multiple restaurants remove above code

      const { url, publicId } = await uploadImage(req.file as Express.Multer.File);

  
      const restaurant = new Restaurant(req.body);
      restaurant.imageUrl = url;
    restaurant.imagePublicId = publicId;
      restaurant.user = new mongoose.Types.ObjectId(req.userId);
      restaurant.lastUpdated = new Date();
      await restaurant.save();
  
      res.status(201).send(restaurant);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  const updateMyRestaurant = async (req: Request, res: Response) => {
    try {
      const restaurant = await Restaurant.findOne({
        user: req.userId,
      });
  
      if (!restaurant) {
        return res.status(404).json({ message: "restaurant not found" });
      }
      
      restaurant.restaurantName = req.body.restaurantName;
      restaurant.city = req.body.city;
      restaurant.country = req.body.country;
      restaurant.deliveryPrice = req.body.deliveryPrice;
      restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
      restaurant.cuisines = req.body.cuisines;
      restaurant.menuItems = req.body.menuItems;
      restaurant.lastUpdated = new Date();

      if (req.file) {
        // Delete the old image
        await cloudinary.v2.uploader.destroy(restaurant.imagePublicId);
  
        // Upload the new image
        const { url, publicId } = await uploadImage(req.file as Express.Multer.File);
        restaurant.imageUrl = url;
        restaurant.imagePublicId = publicId; // save the new public ID
      }
  
      await restaurant.save();
      res.status(200).send(restaurant);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  export default {
    createMyRestaurant,
    getMyRestaurant,
    updateMyRestaurant,
  };