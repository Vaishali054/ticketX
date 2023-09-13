import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import sendMail from "./sendMail.js";
import Admins from "../models/Admins.js";
import { AdminLoginData, AdminSignupData } from "../types/admin.js";
import {
  adminLoginInputSchema,
  adminSignupInputSchema,
} from "../validation/admin.js";

export const handleAdminSignup = async (req: Request, res: Response) => {
  const bodyData: AdminSignupData = req.body;

  const isValidInput = adminSignupInputSchema.safeParse(bodyData);

  if (!isValidInput.success) {
    res.status(400).json({
      message: isValidInput.error.issues[0].message,
      error: isValidInput.error,
    });
    return;
  }

  const { name, email, password } = isValidInput.data;

  try {
    const admin = await Admins.findOne({ email });

    if (admin) {
      res.status(409).json({ message: "Email address is already in use." });
      return;
    }

    if (!process.env.JWT_OTP_SECRET || !process.env.JWT_AUTH_SECRET) {
      throw new Error("JWT_SECRET environment variable is not defined.");
    }

    const OTP = Math.floor(Math.random() * 999999);
    await sendMail(email, OTP);

    const OTP_token = jwt.sign({ OTP: OTP }, process.env.JWT_OTP_SECRET, {
      expiresIn: "5m",
    });
    const encrypted_Pswd = await bcrypt.hash(password, 11);

    const newAdmin = new Admins({
      name,
      email,
      password: encrypted_Pswd,
      OTP: OTP_token,
      OTP_Attempt: 1,
    });
    await newAdmin.save();

    const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_AUTH_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ message: "Signed successfully", authToken: token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error during admin signup" });
    console.log(err);
  }
};

export const handleAdminLogin = async (req: Request, res: Response) => {
  const bodyData: AdminLoginData = req.body;

  const isValidInput = adminLoginInputSchema.safeParse(bodyData);

  if (!isValidInput.success) {
    res.status(400).json({
      message: isValidInput.error.issues[0].message,
      error: isValidInput.error,
    });
    return;
  }

  const { email, password } = isValidInput.data;

  try {
    const admin = await Admins.findOne({ email });

    if (!admin) {
      res
        .status(404)
        .json({ message: `The admin with the email ${email} does not exist.` });
      return;
    }

    if (admin.banned) {
      res.status(403).json({ message: `Admin ${email} is banned.` });
      return;
    }

    const isValidPswd = await bcrypt.compare(password, admin.password);

    if (!isValidPswd) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    if (!process.env.JWT_AUTH_SECRET) {
      throw new Error("JWT_AUTH_SECRET environment variable is not defined.");
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_AUTH_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Logged successfully", authToken: token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error during admin login" });
    console.log(err);
  }
};
