import Footer from "@/components/home/Footer";
import NavBar from "@/components/home/NavBar";
import { Outlet } from "react-router-dom";

function HomeLayout() {
    return (
        <div className="w-full min-h-screen">
            <NavBar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default HomeLayout;
