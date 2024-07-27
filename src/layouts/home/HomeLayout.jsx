import LoadingOverlay from "@/components/common/LoadingOverlay";
import Footer from "@/components/home/Footer";
import NavBar from "@/components/home/NavBar";
import { LocationProvider } from "@/hooks/useLocation";
import { StoreProvider } from "@/hooks/useStore";
import { Outlet } from "react-router-dom";

function HomeLayout() {
    return (
        <>
            <LocationProvider>
                <StoreProvider>
                    <div className="min-h-full">
                        <div className="w-full bg-white">
                            <NavBar />
                            <main>
                                <Outlet />
                            </main>
                        </div>
                    </div>
                    <LoadingOverlay />
                </StoreProvider>
            </LocationProvider>
        </>
    );
}

export default HomeLayout;
