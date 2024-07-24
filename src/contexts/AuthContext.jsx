import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { callAPI } from "@/services/api.service";
import { API_ROUTES } from "@/constants/routes";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: null,
        token: null,
    });
    const verifyToken = async () => {
        try {
            const response = await callAPI(API_ROUTES.VERIFY_TOKEN, "POST");
            console.log(response);
            setAuth({
                isAuthenticated: true,
                user: response.user,
                token: response.token,
            });
        } catch (error) {
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
