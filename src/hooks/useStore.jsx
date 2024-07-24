import { createContext, useContext, useState } from "react";
import { PropTypes } from "prop-types";
const StoreContext = createContext(null);
export function StoreProvider({ children }) {
    const [store, setStore] = useState({});
    return <StoreContext.Provider value={{ store, setStore }}>{children}</StoreContext.Provider>;
}
export default function useStore() {
    return useContext(StoreContext);
}
StoreProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
