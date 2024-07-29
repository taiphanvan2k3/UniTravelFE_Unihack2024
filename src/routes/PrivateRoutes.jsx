import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const { auth } = useContext(AuthContext);
    return auth.user ? <Outlet /> : <Navigate to="/auth/sign-in" />;
};
export default PrivateRoute;
