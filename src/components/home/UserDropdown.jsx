import { DefaultAvatar01 } from "@/assets/images";
import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";
import { callAPI } from "@/services/api.service";
import { useToast } from "@chakra-ui/react";
import { setCookie } from "@/services/utils";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import { LoadingContext } from "@/contexts/LoadingContext";

const useOutsideClick = (handler) => {
    const ref = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                handler();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
    return ref;
};

const UserDropdown = ({ userInfo }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useOutsideClick(() => setIsDropdownOpen(false));
    const { setAuth } = useContext(AuthContext);
    const { setLoading } = useContext(LoadingContext);
    const toast = useToast();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await callAPI("/auth/sign-out", "POST", { email: userInfo.email }, null, setLoading);
            setAuth({
                isAuthenticated: false,
                user: null,
                token: null,
            });
            navigate("/");
            setCookie("redirect", "", 0);
        } catch (error) {
            toast({
                title: "Logout failed",
                status: "error",
                position: "bottom-right",
                duration: 3000,
                isClosable: true,
            });
        }
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
                    <div
                        className="absolute right-0 border border-solid border-[#d7d7d7] shadow-lg shadow-slate-400 min-w-[220px] max-w-[250px] z-[100] bg-[#fff] rounded pt-[5px]"
                        ref={dropdownRef}
                    >
                        <div className="border-b-2 p-3 flex">
                            <div className="shrink-0">
                                <img
                                    src={userInfo.avatar ?? DefaultAvatar01}
                                    alt=""
                                    className="rounded-full w-[40px] h-[40px] cursor-pointer"
                                />
                            </div>
                            <div className="ml-[12px] max-w-[calc(100%-60px)]">
                                <div className="font-medium text-[0.85rem]">{userInfo.displayName}</div>
                                <div className="font-normal text-[0.8rem] overflow-hidden text-ellipsis whitespace-nowrap font-sans">
                                    {userInfo.email}
                                </div>
                            </div>
                        </div>
                        <div></div>
                        <div>
                            <div className="p-2 pl-3 hover:bg-[#edeff4]">
                                <button onClick={handleShowProfile} className="font-medium w-[100%] text-left">
                                    <Link to="/profile">Your profile</Link>
                                </button>
                            </div>
                            <div className="p-2 pl-3 hover:bg-[#edeff4]">
                                <button
                                    onClick={handleLogout}
                                    className="font-medium w-[100%] text-left hover:bg-[#edeff4]"
                                >
                                    Log out
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

UserDropdown.propTypes = {
    userInfo: PropTypes.object.isRequired,
};

export default UserDropdown;
