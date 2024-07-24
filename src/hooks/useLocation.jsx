import { PropTypes } from "prop-types";
import { createContext, useContext, useState } from "react";
const LocationContext = createContext();

export function LocationProvider({ children }) {
    const [location, setLocation] = useState({});
    return <LocationContext.Provider value={{ location, setLocation }}>{children}</LocationContext.Provider>;
}
export default function useLocation() {
    return useContext(LocationContext);
}
LocationProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
