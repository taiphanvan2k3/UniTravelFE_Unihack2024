import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = () => {
    const accessToken = Cookies.get("access_token"); //
    return accessToken ? <Outlet /> : <Navigate to="/auth/sign-in" />;
};
export default PrivateRoute;
