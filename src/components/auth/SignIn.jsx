import { Link, useNavigate } from "react-router-dom";
import Button from "./Form/Button";
import InputForm from "./Form/InputForm";
import Header from "./Header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { useToast } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import ROUTE_CONSTANTS from "@/constants/routes";
import { getCookieValue, setCookie } from "@/services/utils";
import { callAPI } from "@/services/api.service";
import { LoadingContext } from "@/contexts/LoadingContext";

function SignIn() {
    const { auth, setAuth } = useContext(AuthContext);
    const { setLoading } = useContext(LoadingContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate(ROUTE_CONSTANTS.HOME_PAGE);
        }
    }, [auth.isAuthenticated, navigate]);

    const toast = useToast();
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

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const responseInfo = await callAPI(import.meta.env.VITE_LOGIN_URL, "POST", data, null, setLoading);
            setAuth({
                isAuthenticated: true,
                user: {
                    ...responseInfo.user,
                    displayName: responseInfo.user.displayName ?? responseInfo.user.email.split("@")[0],
                },
            });

            toast({
                title: "Login successfully",
                status: "success",
                position: "bottom-right",
                duration: 3000,
                isClosable: true,
            });

            // Redirect về trang trước đó
            const redirect = getCookieValue("redirect") || ROUTE_CONSTANTS.HOME_PAGE;
            setCookie("redirect", "", 0);
            navigate(redirect);
        } catch (error) {
            toast({
                title: "Username or password is incorrect",
                status: "error",
                position: "bottom-right",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <div className="flex flex-col w-1/2 justify-start items-center">
            <div className="w-3/5">
                <div className="flex flex-col items-start mt-4">
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
                            <Link
                                className="text-black m-3 text-sm hover:text-sky-400 duration-300 ease-in-out"
                                to="/auth/forgot-password"
                            >
                                Forgot Password
                            </Link>
                        </div>
                        <Button type="submit">Sign In</Button>
                        <div className="flex justify-center items-center gap-2 mt-4">
                            <p className="text-black ">Do not have account? </p>
                            <Link to={ROUTE_CONSTANTS.SIGN_UP_PAGE} className="hover:underline font-bold">
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
