import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import ROUTES_CONSTANTS from "@/constants/routes";
import { setCookie } from "@/services/utils";

function ReviewsPage() {
    const { auth } = useContext(AuthContext);
    console.log(auth);

    if (!auth.isAuthenticated) {
        // Điều hướng người dùng đến trang đăng nhập nếu chưa đăng nhập
        setCookie("redirect", ROUTES_CONSTANTS.REVIEWS_PAGE, 10 * 60 * 1000);
        return <Navigate to={ROUTES_CONSTANTS.SIGN_IN_PAGE} />;
    }

    return (
        <div>
            <h1>Reviews</h1>
        </div>
    );
}

export default ReviewsPage;
