import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { callAPI } from "@/services/api.service";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    console.log("AuthProvider re-render");
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: null,
        token: null,
    });

    const verifyToken = async () => {
        try {
            const response = await callAPI("/auth/verify-token", "POST");
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
