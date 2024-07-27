import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const accessToken = Cookies.get("access_token");
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: null,
        token: null,
    });
    useEffect(() => {
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            setAuth({
                isAuthenticated: true,
                user: decodedToken,
                token: accessToken,
            });
        } else {
            setAuth({
                isAuthenticated: false,
                user: null,
                token: null,
            });
        }
    }, [accessToken]);
    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
