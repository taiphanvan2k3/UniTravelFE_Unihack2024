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

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/auth" element={<AuthLayout />}>
                        <Route index element={<Navigate to="/auth/signin" />} />
                        <Route path="signin" element={<SignInPage />} />
                        <Route path="signup" element={<SignUpPage />} />
                    </Route>
                </Route>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminPage />} />
                    <Route path="dashboard" element={<DashBoardPage />} />
                    <Route path="users" element={<UsersPage />} />
                </Route>
            </Routes>
        </Router>
    );
}
