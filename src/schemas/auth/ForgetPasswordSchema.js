import { z } from "zod";
const ForgotPasswordSchema = z.object({
    email: z.string().email("Email should have @"),
});

export default ForgotPasswordSchema;
