import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const LoadingContext = createContext();
const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const value = useMemo(() => ({ loading, setLoading }), [loading, setLoading]);

    return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
};

LoadingProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { LoadingContext, LoadingProvider };
