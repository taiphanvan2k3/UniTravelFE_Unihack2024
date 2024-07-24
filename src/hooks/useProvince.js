import { LoadingContext } from "@/contexts/LoadingContext";
import { callAPI } from "@/services/api.service";
import { useContext, useEffect, useState } from "react";

function useProvince({ code }) {
    const [location, setLocation] = useState();
    const { setLoading } = useContext(LoadingContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${import.meta.env.VITE_PROVINCES_URL}/${code}${import.meta.env.VITE_PROVINCES_EXPERIENCE_LOCATIONS}`;
                const responseData = await callAPI(url, "GET", null, {}, setLoading);
                setLocation(responseData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [setLoading, code]);
    return { location };
}

export default useProvince;
