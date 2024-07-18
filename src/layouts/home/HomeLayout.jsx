import LoadingOverlay from "@/components/common/LoadingOverlay";
import Footer from "@/components/home/Footer";
import NavBar from "@/components/home/NavBar";
import { LocationProvider } from "@/hooks/useLocation";
import { Outlet } from "react-router-dom";

function HomeLayout() {
    return (
        <>
            <LocationProvider>
                <div className="w-full min-h-screen">
                    <NavBar />
                    <main>
                        <Outlet />
                    </main>
                </div>
                <Footer />
                <LoadingOverlay />
            </LocationProvider>
        </>
    );
}

export default HomeLayout;
