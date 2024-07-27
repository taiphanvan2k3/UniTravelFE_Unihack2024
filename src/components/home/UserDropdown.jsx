import { DefaultAvatar01 } from "@/assets/images";
import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";
import { Avatar, Box, Flex, Image, Text, useToast, VStack } from "@chakra-ui/react";
import { setCookie } from "@/services/utils";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import { LoadingContext } from "@/contexts/LoadingContext";
import Cookies from "js-cookie";
import { faShareFromSquare, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
const getRoleName = (roleName) => {
    switch (roleName[0]) {
        case "store-owner":
            return "Store Owner";
        case "traveler":
            return "Traveler";
        default:
            return "Admin";
    }
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
            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}${import.meta.env.VITE_SIGNOUT_URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("access_token")}`,
                },
                body: JSON.stringify({ email: userInfo.email }),
            });
            if (!res.ok) {
                throw new Error("Logout failed");
            }
            setAuth({
                isAuthenticated: false,
                user: null,
                token: null,
            });
            Cookies.remove("access_token"); // Replace 'access_token' with the name of the cookie you want to delete
            navigate("/");
            setCookie("redirect", "", 0);
            setLoading(false);
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

    return (
        <Box position={"relative"} zIndex={10} ref={dropdownRef}>
            <Avatar cursor={"pointer"} onClick={() => setIsDropdownOpen(!isDropdownOpen)} src={DefaultAvatar01} />
            {isDropdownOpen && (
                <VStack
                    zIndex={20}
                    position={"absolute"}
                    width={"300px"}
                    top={"100%"}
                    right={"80%"}
                    ref={dropdownRef}
                    boxShadow={"lg"}
                    padding={6}
                    rounded={"lg"}
                    bg={"white"}
                    className="cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <Flex alignItems={"center"} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <Image width={"50px"} height={"50px"} src={DefaultAvatar01} borderRadius={"full"} />

                        <VStack alignItems={"flex-start"} marginLeft={"20px"}>
                            <Text fontWeight={"bold"} fontSize={"md"} className="text-primary-100">
                                {getRoleName(userInfo.roles)}
                            </Text>
                            <Text fontWeight={"bold"} textOverflow={"hidden"} fontSize={"xs"} className="text-gray-400">
                                {userInfo.email}
                            </Text>
                        </VStack>
                    </Flex>
                    <Box marginTop={4} height={"2px"} width={"100%"} backgroundColor={"gray.200"}></Box>
                    <Flex
                        width={"100%"}
                        justifyContent={"flex-start"}
                        marginTop={2}
                        alignItems={"center"}
                        gap={4}
                        paddingX={2}
                    >
                        <FontAwesomeIcon icon={faUser} />
                        <Link>View Profile</Link>
                    </Flex>
                    <Link></Link>
                    <Flex
                        width={"100%"}
                        justifyContent={"flex-start"}
                        marginTop={2}
                        alignItems={"center"}
                        gap={4}
                        paddingX={2}
                        onClick={() => navigate("/unitravel")}
                    >
                        <FontAwesomeIcon icon={faShareFromSquare} />
                        <Text>Unitravel</Text>
                    </Flex>
                    <Box marginTop={2} height={"2px"} width={"100%"} backgroundColor={"gray.200"}></Box>
                    <Flex
                        width={"100%"}
                        justifyContent={"flex-start"}
                        marginTop={2}
                        alignItems={"center"}
                        gap={4}
                        paddingX={2}
                        onClick={handleLogout}
                    >
                        <FontAwesomeIcon icon={faSignOut} />
                        <Text>Logout</Text>
                    </Flex>
                </VStack>
            )}
        </Box>
    );
};

UserDropdown.propTypes = {
    userInfo: PropTypes.object.isRequired,
};

export default UserDropdown;
