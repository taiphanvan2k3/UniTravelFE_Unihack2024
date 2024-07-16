/* eslint-disable react/prop-types */
import { forwardRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const InputForm = forwardRef(function InputForm(
    { name, type, labelText, divStyles, placeholder, autoComplete = "on", onChange, onBlur, error, ...rest },
    ref
) {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="flex flex-col mt-4 w-full" style={divStyles}>
            <label className="mb-2 capitalize text-base font-semibold" htmlFor={name}>
                {labelText ?? name}
            </label>
            <div className="w-full border-2 border-gray-400 rounded-md py-2 text-md px-3 flex items-center">
                <input
                    type={showPassword ? "text" : type}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    className="outline-none w-full"
                    onChange={onChange}
                    onBlur={onBlur}
                    autoComplete={autoComplete}
                    ref={ref}
                    {...rest}
                />
                {type === "password" && (
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-auto">
                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                    </button>
                )}
            </div>
            <p className="mt-2 text-[#ea9494]">{error?.["message"] ?? ""}</p>
        </div>
    );
});

InputForm.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    labelText: PropTypes.string,
    placeholder: PropTypes.string,
    divStyles: PropTypes.object,
    autoComplete: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    error: PropTypes.object,
};

InputForm.displayName = "InputForm";
export default InputForm;
