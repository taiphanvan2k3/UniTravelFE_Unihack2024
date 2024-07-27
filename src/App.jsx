import { Route, Routes, BrowserRouter as Router, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/auth/AuthLayout";
import SignInPage from "./pages/auth/sign-in";
import SignUpPage from "./pages/auth/sign-up";
import HomeLayout from "./layouts/home/HomeLayout";
import HomePage from "./pages/home";
import AdminLayout from "./layouts/admin/AdminLayout";
import AdminPage from "./pages/admin";
import DashBoardPage from "./pages/admin/dashboard";
import UsersPage from "./pages/admin/users";
import ReviewsPage from "./pages/reviews";
import ForgotPassword from "./components/auth/ForgotPassword";
import Country from "./components/home/Country";
import ProvincesPage from "./pages/home/provinces";
import ProvinceDetailPage from "./pages/home/provinces/provinces-detail";
import LocationPage from "./pages/home/location";
import StorePage from "./pages/store";
import SchedulePage from "./pages/home/schedule";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import StoreDetailPage from "./pages/store/store-detail";
import SocialLayout from "./layouts/social/SocialLayout";
import SocialPage from "./pages/social";
import PrivateRoute from "./routes/PrivateRoutes";
import FindStorePage from "./pages/home/find-store";
const queryClient = new QueryClient();
export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/" element={<HomeLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="booking" element={<HomePage />} />
                        <Route path="reviews" element={<ReviewsPage />} />
                        <Route path="provinces" element={<ProvincesPage />} />
                        <Route path="provinces/:code" element={<ProvinceDetailPage />} />
                        <Route path="location/:id" element={<LocationPage />} />
                        <Route path="/schedule" element={<SchedulePage />} />
                        <Route path="/store" element={<StorePage />} />
                        <Route path="/store/:storeId" element={<StoreDetailPage />} />
                        <Route path="/find-store" element={<FindStorePage />} />
                        <Route path="auth" element={<AuthLayout />}>
                            <Route index element={<Navigate to="/auth/sign-in" />} />
                            <Route path="sign-in" element={<SignInPage />} />
                            <Route path="sign-up" element={<SignUpPage />} />
                            <Route path="forgot-password" element={<ForgotPassword />} />
                        </Route>
                        <Route path="/country/:countryId" element={<Country />} />
                    </Route>
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminPage />} />
                        <Route path="dashboard" element={<DashBoardPage />} />
                        <Route path="users" element={<UsersPage />} />
                        <Route path="location" element={<LocationPage />} />
                    </Route>
                    <Route exact path="/" element={<PrivateRoute />}>
                        <Route exact path="/unitravel" element={<SocialLayout />}>
                            <Route index element={<Navigate to="/unitravel/new-feeds" />} />
                            <Route path="new-feeds" element={<SocialPage />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
