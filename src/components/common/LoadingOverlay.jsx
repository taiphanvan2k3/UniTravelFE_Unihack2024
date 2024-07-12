import React, { useContext } from "react";
import { Loading } from "@/assets/images";
import { LoadingContext } from "@/contexts/LoadingContext";

const LoadingOverlay = () => {
    const { loading } = useContext(LoadingContext);
    return (
        loading && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
                <img src={Loading} alt="loading" />
            </div>
        )
    );
};

export default LoadingOverlay;
