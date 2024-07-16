import { z } from "zod";
const SignUpSchema = z
    .object({
        displayName: z.string().min(3, { message: "Display name must be at least 3 characters" }),
        email: z.string().email("Email should have @"),
        role: z
            .object({
                value: z.string(),
            })
            .nullable()
            .refine((data) => data !== null && data.value !== "", {
                message: "Please select your role",
            }),
        password: z.string().min(8, { message: "Password must be at least 8 characters" }),
        confirmPassword: z.string().min(8, { message: "Confirm Password must be at least 8 charaters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password not match",
        path: ["confirmPassword"],
    });

export default SignUpSchema;
