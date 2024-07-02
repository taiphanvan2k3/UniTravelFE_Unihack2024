import { Link } from "react-router-dom";
import Button from "./Form/Button";
import InputForm from "./Form/InputForm";
import Header from "./Header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";

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
    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <div className="flex flex-col w-1/2 justify-start items-center">
            <div className="w-3/5">
                <div className="flex flex-col items-start mt-10">
                    <Header title="Sign In" description="Welcome back! Please enter your details" />
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-1 w-full">
                        <InputForm error={errors.email} {...register("email")} type="email" name="email" />
                        <InputForm error={errors.password} {...register("password")} type="password" name="password" />
                        <div className="w-full flex justify-end items-center">
                            <Link className="text-black m-3 text-sm hover:text-sky-400 duration-300 ease-in-out" to="/">
                                Forgot Password
                            </Link>
                        </div>
                        <Button type="submit">Sign In</Button>
                        <div className="flex justify-center items-center gap-2 mt-4">
                            <p className="text-black ">Don't have account? </p>
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
