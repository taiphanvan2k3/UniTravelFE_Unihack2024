import { Link } from "react-router-dom";
import Button from "./Form/Button";
import InputForm from "./Form/InputForm";
import Header from "./Header";
import { useForm, Controller } from "react-hook-form";
import { SignUpSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight, faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { callAPI } from "@/services/api.service";
import { API_ROUTES, ROUTE_CONSTANTS } from "@/constants/routes";
import { useToast } from "@chakra-ui/react";
import { LoadingContext } from "@/contexts/LoadingContext";

function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        trigger,
        setError,
        setFocus,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            displayName: "",
            role: null,
            email: "",
            password: "",
            confirmPassword: "",
        },
        resolver: zodResolver(SignUpSchema),
    });

    const toast = useToast();
    const { setLoading } = useContext(LoadingContext);
    const [pageIndex, setPageIndex] = useState(1);
    const [emailError, setEmailError] = useState(null);

    const roles = [
        { value: "traveler", label: "Traveler" },
        { value: "store-owner", label: "Store owner" },
        { value: "tour-guider", label: "Tour guider" },
    ];

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: "gray",
            "&:hover": {
                borderColor: "gray",
            },
            boxShadow: "gray",
        }),
        menu: (provided) => ({
            ...provided,
            borderColor: "gray",
        }),
    };

    const validateOnNext = async () => {
        const result = await trigger(["displayName", "role"]);
        if (result) {
            setPageIndex(2);
        }
    };

    const onSubmit = async (data) => {
        const newData = {
            email: data.email,
            password: data.password,
            displayName: data.displayName,
            role: data.role.value,
        };

        if (false) {
            setFocus("email");
        } else {
            try {
                await callAPI(API_ROUTES.SIGN_UP, "POST", newData, null, setLoading);
                toast({
                    title: "Please check your email to verify your account",
                    status: "success",
                    position: "bottom-right",
                    duration: 3000,
                    isClosable: true,
                });
            } catch (error) {
                toast({
                    title: error.message,
                    status: "error",
                    position: "bottom-right",
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    };

    const checkEmailIsExist = async (event) => {
        try {
            const isValidMail = await trigger("email");
            if (isValidMail) {
                const email = event.target.value;
                const response = await callAPI(API_ROUTES.CHECK_EMAIL_EXIST, "POST", { email });
                if (response.isExist) {
                    setError("email", {
                        type: "manual",
                        message: "Email is already exist",
                    });
                    setEmailError("Email is already exist");
                } else {
                    setEmailError(null);
                }
            }
        } catch (error) {
            toast({
                title: "Internal server error",
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
                    <Header title="Sign Up" description="Please enter your profile in signup" />
                    <form onSubmit={handleSubmit(onSubmit)} className={`w-full`}>
                        {/* Page 1: User information */}
                        <div className={`${pageIndex == 1 ? "flex flex-col" : "hidden"} w-full`}>
                            <InputForm
                                {...register("displayName")}
                                error={errors.displayName}
                                type="text"
                                name="displayName"
                                placeholder="Enter your name"
                                labelText="Display Name"
                                autoComplete="off"
                            />
                            <div>
                                <h1 className="mt-2 mb-2 capitalize text-base font-semibold">Role</h1>
                                <Controller
                                    name="role"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={roles}
                                            components={{ DropdownIndicator: null }}
                                            placeholder="Select your role"
                                            styles={customStyles}
                                            isClearable
                                            onChange={(selectedOption) => field.onChange(selectedOption)}
                                        />
                                    )}
                                />
                                <p className="mt-2 text-[#ee7d7d]">{errors.role?.message ?? ""}</p>
                            </div>
                            <br />
                            <div className="flex justify-center items-center gap-2 mt-4">
                                <p className="text-black ">Already have account? </p>
                                <Link
                                    to={ROUTE_CONSTANTS.SIGN_IN_PAGE}
                                    className="hover:underline font-bold text-primary-100"
                                >
                                    Sign In
                                </Link>
                            </div>

                            <button
                                type="button"
                                onClick={validateOnNext}
                                className="flex items-center justify-center gap-[5px] mt-[20px]"
                            >
                                <span className="pb-[4px]">Next</span>
                                <FontAwesomeIcon icon={faAngleDoubleRight} />
                            </button>
                        </div>

                        {/* Page 2: Email, password */}
                        <div className={`${pageIndex == 2 ? "flex flex-col" : "hidden"} w-full`}>
                            <InputForm
                                {...register("email")}
                                error={errors.email || { message: emailError }}
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                divStyles={{ marginTop: "5px" }}
                                onBlur={checkEmailIsExist}
                            />
                            <InputForm
                                {...register("password")}
                                error={errors.password}
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                divStyles={{ marginTop: "5px" }}
                            />
                            <InputForm
                                {...register("confirmPassword")}
                                error={errors.confirmPassword}
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                labelText="Confirm Password"
                                divStyles={{ marginTop: "5px" }}
                            />

                            <Button styles={{ marginTop: "10px" }} type="submit">
                                Sign Up
                            </Button>
                            <div className="flex justify-center items-center gap-2 mt-2">
                                <p className="text-black ">Already have account? </p>
                                <Link to={ROUTE_CONSTANTS.SIGN_IN_PAGE} className="hover:underline font-bold">
                                    Sign In
                                </Link>
                            </div>
                            <button
                                type="button"
                                onClick={() => setPageIndex(1)}
                                className="flex items-center justify-center gap-[5px]"
                            >
                                <FontAwesomeIcon icon={faAngleDoubleLeft} />
                                <span className="pb-[3px]">Back</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
