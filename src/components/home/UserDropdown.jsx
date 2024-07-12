import { DefaultAvatar01 } from "@/assets/images";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { callAPI } from "@/services/api.service";
import { useToast } from "@chakra-ui/react";
import { setCookie } from "@/services/utils";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import { LoadingContext } from "@/contexts/LoadingContext";

const UserDropdown = ({ userInfo }) => {
    console.log("UserDropdown re-render");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { setAuth } = useContext(AuthContext);
    const { setLoading } = useContext(LoadingContext);
    const toast = useToast();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await callAPI("/auth/sign-out", "POST", { email: userInfo.email }, null, setLoading);
            if (response) {
                setAuth({
                    isAuthenticated: false,
                    user: null,
                    token: null,
                });
                navigate("/");
                setCookie("redirect", "", 0);
            } else {
                toast({
                    title: "Logout failed",
                    status: "error",
                    position: "bottom-right",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {}
    };

    const handleShowProfile = () => {};

    return (
        <div className="flex items-center gap-2">
            <div className="relative">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <img
                        src={userInfo.avatar ?? DefaultAvatar01}
                        alt="avatar"
                        className="rounded-full w-[40px] h-[40px] cursor-pointer"
                    />
                </button>

                {isDropdownOpen && (
                    <div className="absolute right-0">
                        <ul>
                            <li>
                                <button onClick={handleShowProfile}>Profile</button>
                            </li>
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <span className="font-medium">{userInfo.displayName}</span>
        </div>
    );
};

UserDropdown.propTypes = {
    userInfo: PropTypes.object.isRequired,
};

export default UserDropdown;
