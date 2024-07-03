import { Outlet } from "react-router-dom";
import { hoian } from "@/assets/images";
export default function AuthLayout() {
    return (
        <div className="w-full flex justify-center items-start">
            <div className="rounded-md p-4 w-3/4 flex items-center h-[700px]">
                <div className="w-full h-full flex bg-white p-4 rounded-lg shadow-xl">
                    <div className="w-1/2">
                        <img src={hoian} alt="Hoi An" className="h-full object-cover rounded-md" />
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
