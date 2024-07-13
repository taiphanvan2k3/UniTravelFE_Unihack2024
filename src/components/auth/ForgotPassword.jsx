import React, { useState } from "react";
import Header from "./Header";
import InputForm from "./Form/InputForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ForgotPasswordSchema } from "@/schemas";
import ROUTE_CONSTANTS from "@/constants/routes";
import { Link } from "react-router-dom";
import Button from "./Form/Button";
import { useToast } from "@chakra-ui/react";
import { callAPI } from "@/services/api.service";

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            email: "",
        },
        resolver: zodResolver(ForgotPasswordSchema),
    });
    const toast = useToast();
    const [showEmailLink, setShowEmailLink] = useState(false);

    const onSubmit = async (data) => {
        const toastContent = {
            status: "success",
            position: "bottom-right",
            duration: 3000,
            isClosable: true,
        };

        try {
            await callAPI(import.meta.env.VITE_PASSWORD_RESET_URL, "POST", { email: data.email });
            toastContent.title = "Reset password successfully";
            toast(toastContent);
            setShowEmailLink(true);
        } catch (error) {
            toastContent.title = "Reset password failed";
            toastContent.status = "error";
            toast(toastContent);
        }
    };

    return (
        <div className="flex flex-col w-1/2 justify-start items-center">
            <div className="w-3/5">
                <div className="flex flex-col items-start mt-4">
                    <Header title="Forgot password" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputForm
                        error={errors.email}
                        {...register("email")}
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                    />
                    <Button type="submit" styles="mt-[10px] mb-[10px]">
                        Reset password
                    </Button>
                </form>
                <div className="flex gap-2 justify-center">
                    <p>Remember your password?</p>
                    <Link to={ROUTE_CONSTANTS.SIGN_IN_PAGE} className="text-[#7bbdf4]">
                        Login here
                    </Link>
                </div>
                {showEmailLink && (
                    <div className="flex flex-col items-center mt-4">
                        <a href="https://mail.google.com/mail/u/0/#inbox" target="_blank" className="text-[#7bbdf4]">
                            Check your email for the password reset link
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
