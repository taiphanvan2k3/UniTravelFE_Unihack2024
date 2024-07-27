import { createContext, useState } from "react";
import PropTypes from "prop-types";

const LoadingContext = createContext();
const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return <LoadingContext.Provider value={{ loading, setLoading }}>{children}</LoadingContext.Provider>;
};

LoadingProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { LoadingContext, LoadingProvider };
