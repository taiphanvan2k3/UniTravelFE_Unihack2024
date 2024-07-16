// Các route của các trang của ứng dụng ReactJS
const ROUTE_CONSTANTS = {
    HOME_PAGE: "/",
    SIGN_IN_PAGE: "/auth/sign-in",
    SIGN_UP_PAGE: "/auth/sign-up",
    REVIEWS_PAGE: "/reviews",
    BOOKING_PAGE: "/booking",
    PROVINCES_PAGE: "/provinces",
};

const API_ROUTES = {
    //#region Auth
    SIGN_IN: "/auth/login-with-email",
    SIGN_UP: "/auth/register-with-email",
    LOG_OUT: "/auth/sign-out",
    VERIFY_TOKEN: "/auth/verify-token",
    CHECK_EMAIL_EXIST: "/auth/check-email-exist",
    //#endregion
};

export { API_ROUTES, ROUTE_CONSTANTS };
