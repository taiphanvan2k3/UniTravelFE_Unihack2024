import { z } from "zod";
const SignUpSchema = z
    .object({
        email: z.string().email("Email should have @"),
        password: z.string().min(8, { message: "Password must be at least 8 characters" }),
        confirmPassword: z.string().min(8, { message: "Confirm Password must be at least 8 charaters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password not match",
        path: ["confirmPassword"],
    });

export default SignUpSchema;
