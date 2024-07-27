export default function reducer(state, action) {
    switch (action.type) {
        case "upvote":
            if (state.isUpvoted) {
                // Remove upvote
                return { ...state, votes: state.votes - 1, isUpvoted: false };
            } else if (state.isDownvoted) {
                // Switch from downvote to upvote
                if (state.votes == 0) {
                    return { ...state, votes: state.votes + 1, isUpvoted: true, isDownvoted: false };
                } else return { ...state, votes: state.votes + 2, isUpvoted: true, isDownvoted: false };
            } else {
                // Add upvote
                return { ...state, votes: state.votes + 1, isUpvoted: true };
            }
        case "downvote":
            if (state.isDownvoted) {
                // Remove downvote
                return { ...state, votes: state.votes + 1, isDownvoted: false };
            } else if (state.isUpvoted) {
                // Switch from upvote to downvote
                return { ...state, votes: Math.max(state.votes - 2, 0), isDownvoted: true, isUpvoted: false };
            } else {
                // Add downvote
                return { ...state, votes: state.votes - 1, isDownvoted: true };
            }
        default:
            return state;
    }
}
