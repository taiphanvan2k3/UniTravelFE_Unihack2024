import { Link } from "react-router-dom";
import Button from "./Form/Button";
import InputForm from "./Form/InputForm";
import Header from "./Header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { useToast } from "@chakra-ui/react";
function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(LoginSchema),
    });
    const toast = useToast();
    const onSubmit = async (data) => {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_LOGIN_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (res.ok) {
            const result = await res.json();
            const expires = new Date();
            expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds
            document.cookie = `access-token=${result.token}; path=/; expires=${expires.toUTCString()};`;
            toast({
                title: "Login successfully",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } else {
            console.log("error");
        }
    };
    return (
        <div className="flex flex-col w-1/2 justify-start items-center">
            <div className="w-3/5">
                <div className="flex flex-col items-start mt-10">
                    <Header title="Sign In" description="Welcome back! Please enter your details" />
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-1 w-full">
                        <InputForm
                            error={errors.email}
                            {...register("email")}
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                        />
                        <InputForm
                            error={errors.password}
                            {...register("password")}
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                        />
                        <div className="w-full flex justify-end items-center">
                            <Link className="text-black m-3 text-sm hover:text-sky-400 duration-300 ease-in-out" to="/">
                                Forgot Password
                            </Link>
                        </div>
                        <Button type="submit">Sign In</Button>
                        <div className="flex justify-center items-center gap-2 mt-4">
                            <p className="text-black ">Do not have account? </p>
                            <Link to="/auth/signup" className="hover:underline font-bold">
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
