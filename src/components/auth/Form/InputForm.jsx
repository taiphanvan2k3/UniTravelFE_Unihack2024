/* eslint-disable react/prop-types */
import { forwardRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// eslint-disable-next-line react/prop-types
const InputForm = forwardRef(function InputForm({ name, type, placeholder, onChange, error, ...rest }, ref) {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="flex flex-col mt-4 w-full ">
            <label className="mb-2 capitalize text-base font-semibold" htmlFor={name}>
                {name}
            </label>
            <div className="w-full border-2 border-black rounded-md py-2 text-md px-3 flex items-center">
                <input
                    type={showPassword ? "text" : type}
                    name={name}
                    placeholder={placeholder}
                    className="outline-none w-full"
                    onChange={onChange}
                    ref={ref}
                    {...rest}
                />
                {type === "password" && (
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-auto">
                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                    </button>
                )}
            </div>
            <p className="mt-2">{error && error["message"]}</p>
        </div>
    );
});

InputForm.displayName = "InputForm";
export default InputForm;
