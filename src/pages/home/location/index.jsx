import LocationItem from "@/components/home/Location/LocationItem";
import { AuthContext } from "@/contexts/AuthContext";
import { locationPath as path } from "@/utils";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function LocationPage() {
    const { auth } = useContext(AuthContext);
    const { id } = useParams();
    const [location, setLocation] = useState();
    useEffect(() => {
        const fetchLocation = async () => {
            const url = path.getDetail(id);
            const res = await fetch(`${url}?userId=${auth.user?.userId ?? ""}`);
            const data = await res.json();
            setLocation(data);
        };
        fetchLocation();
    }, [id, auth.user]);
    return <LocationItem {...location} id={id} />;
}

export default LocationPage;
