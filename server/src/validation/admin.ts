import { z } from "zod";

export const adminSignupInputSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(40, "Name can't exceed 40 characters"),
  email: z
    .string()
    .min(5, "Email must be at least 5 characters long")
    .max(50, "Email can't exceed 50 characters")
    .email("Invalid email format")
    .endsWith("@i-her.org", "Invalid admin email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password can't exceed 100 characters"),
});

export const adminLoginInputSchema = z.object({
  email: z
    .string()
    .min(5, "Email must be at least 5 characters long")
    .max(50, "Email can't exceed 50 characters")
    .email("Invalid email format")
    .endsWith("@i-her.org", "Invalid admin email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password can't exceed 100 characters"),
});
