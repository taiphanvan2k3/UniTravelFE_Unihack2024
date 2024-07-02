import { Link } from "react-router-dom";
import Button from "./Form/Button";
import InputForm from "./Form/InputForm";
import Header from "./Header";
import { useForm } from "react-hook-form";
import { SignUpSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        resolver: zodResolver(SignUpSchema),
    });
    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <div className="flex flex-col w-1/2 justify-start items-center">
            <div className="w-3/5">
                <div className="flex flex-col items-start mt-10">
                    <Header title="Sign Up" description="Please enter your profile in signup" />
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4 w-full">
                        <InputForm
                            {...register("email")}
                            error={errors.email}
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                        />
                        <InputForm
                            {...register("password")}
                            error={errors.password}
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                        />
                        <InputForm
                            {...register("confirmPassword")}
                            error={errors.confirmPassword}
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                        />

                        <br />
                        <Button>Sign In</Button>
                        <div className="flex justify-center items-center gap-2 mt-4">
                            <p className="text-black ">Already have account? </p>
                            <Link to="/auth/signin" className="hover:underline font-bold">
                                Sign In
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
