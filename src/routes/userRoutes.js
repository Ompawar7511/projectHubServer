import express from "express";
import {
  register,
  signin,
  sendOtp,
  resetPassword,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/auth.js";
import Description from "../models/Description.js";

const router = express.Router();

router.post("/register", register);

router.post("/signin", signin);

router.post("/otp", sendOtp);

router.put("/reset-password", resetPassword);

///

router.post("/description", async (req, res) => {
  try {
    // include your new field from the form
    const { name, email, description, isChecked } = req.body;

    // create a new Description document with the new field
    const dsc = new Description({
      name,
      email,
      description,
      isChecked, // <-- add this
    });

    await dsc.save();

    res.status(201).json("ok");
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

export default router;
