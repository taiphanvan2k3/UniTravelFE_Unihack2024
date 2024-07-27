import { useEffect, useState } from "react";

const useLocationGeo = () => {
    const [location, setLocation] = useState({ latitude: "", longitude: "" });
    const [error, setError] = useState("");
    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
                        setError("");
                    },
                    (err) => {
                        setError(err.message);
                    }
                );
            } else {
                setError("Geolocation is not supported by this browser.");
            }
        };

        getLocation();
    }, []);
    return { location, error };
};
export default useLocationGeo;
