import { Link } from "react-router-dom";
import Button from "./Form/Button";
import InputForm from "./Form/InputForm";
import Header from "./Header";

function SignUp() {
    return (
        <div className="flex flex-col w-1/2 justify-start items-center">
            <div className="w-3/5">
                <div className="flex flex-col items-start mt-10">
                    <Header title="Sign Up" description="Please enter your profile in signup" />
                    <div className="flex flex-col mt-4 w-full">
                        <InputForm type="email" name="email" />
                        <InputForm type="password" name="password" />
                        <br />
                        <Button>Sign In</Button>
                        <div className="flex justify-center items-center gap-2 mt-4">
                            <p className="text-black ">Already have account? </p>
                            <Link to="/auth/signin" className="hover:underline font-bold">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
