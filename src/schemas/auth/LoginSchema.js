import { z } from "zod";
const LoginSchema = z.object({
    email: z.string().email("Email should have @"),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export default LoginSchema;
