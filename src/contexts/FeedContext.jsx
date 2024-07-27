import { createContext, useContext, useState } from "react";
import { PropTypes } from "prop-types";
const FeedContext = createContext(null);
const FeedProvider = ({ children }) => {
    const [isPending, setIsPending] = useState(false);
    const [feeds, setFeeds] = useState([]);
    return <FeedContext.Provider value={{ isPending, setIsPending, feeds, setFeeds }}>{children}</FeedContext.Provider>;
};
const useFeeds = () => {
    return useContext(FeedContext);
};
FeedProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
export { FeedContext, FeedProvider, useFeeds };
