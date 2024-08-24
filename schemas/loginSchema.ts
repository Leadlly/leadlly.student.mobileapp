import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Please enter your password" }),
});

export const SignUpFormSchema = z.object({
  fullName:z
		.string({ required_error: 'Full  name is required' }),
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Invalid email address' }),
	password: z
		.string({ required_error: 'Password is required' })
		.min(8, { message: 'Please enter your password' }),
});