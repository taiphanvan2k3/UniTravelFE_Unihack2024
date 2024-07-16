import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "@/constants/routes";
import { setCookie } from "@/services/utils";

function ReviewsPage() {
    const { auth } = useContext(AuthContext);
    if (!auth.isAuthenticated) {
        // Điều hướng người dùng đến trang đăng nhập nếu chưa đăng nhập
        setCookie("redirect", ROUTE_CONSTANTS.REVIEWS_PAGE, 10 * 60 * 1000);
        return <Navigate to={ROUTE_CONSTANTS.SIGN_IN_PAGE} />;
    }

    return (
        <div>
            <h1>Reviews</h1>
        </div>
    );
}

export default ReviewsPage;
