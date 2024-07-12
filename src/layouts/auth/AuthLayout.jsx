import { Outlet } from "react-router-dom";
import { HoiAn } from "@/assets/images";
export default function AuthLayout() {
    return (
        <div className="w-full flex justify-center items-start">
            <div className="rounded-md w-4/5 flex items-center h-[550px]">
                <div className="w-full h-full flex bg-white p-4 rounded-lg shadow-xl">
                    <div className="w-1/2">
                        <img src={HoiAn} alt="Hoi An" className="h-full object-cover rounded-md" />
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
