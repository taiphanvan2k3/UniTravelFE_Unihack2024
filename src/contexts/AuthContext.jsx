import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { callAPI } from "@/services/api.service";
import { API_ROUTES } from "@/constants/routes";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    // const accessToken = Cookies.get("access_token");
    // const [auth, setAuth] = useState({
    //     isAuthenticated: false,
    //     user: null,
    //     token: null,
    // });
    // useEffect(() => {
    //     if (accessToken) {
    //         const decodedToken = jwtDecode(accessToken);
    //         setAuth({
    //             isAuthenticated: true,
    //             user: decodedToken,
    //             token: accessToken,
    //         });
    //     } else {
    //         setAuth({
    //             isAuthenticated: false,
    //             user: null,
    //             token: null,
    //         });
    //     }
    // }, [accessToken]);
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: null,
        token: null,
    });

    const verifyToken = async () => {
        try {
            console.log("Verifying token");
            const response = await callAPI(API_ROUTES.VERIFY_TOKEN, "POST");
            setAuth({
                isAuthenticated: true,
                user: response.user,
                token: response.token,
            });
        } catch (error) {
            console.log(error);
            setAuth({
                isAuthenticated: false,
                user: null,
                token: null,
            });
        }
    };

    useEffect(() => {
        verifyToken();
    }, []);
    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
