import provinces from "@/assets/images/city";
const env = import.meta.env;
const baseUrl = `${env.VITE_SERVER_BASE_URL}`;
const locationUrl = `${baseUrl}${env.VITE_PROVINCES_EXPERIENCE_LOCATIONS}`;
const postsUrl = `${baseUrl}${env.VITE_POSTS_URL}`;
const storeUrl = `${baseUrl}${env.VITE_STORES_URL}`;
const locationPath = {
    getDetail: (id) => `${locationUrl}/get-detail/${id}`,
    getTop: (limit) => `${locationUrl}/top?limit=${limit}`,
    getPost: (id, pageIndex, pageSize) => `${locationUrl}/${id}/posts?pageIndex=${pageIndex}&pageSize=${pageSize}`,
};
const postFuncPath = {
    createPost: (id) => `${postsUrl}/${id}/create-post`,
    addComment: (id) => `${postsUrl}/${id}/add-comment`,
    addReply: (postId, commentId) => `${postsUrl}/${postId}/${commentId}/add-reply`,
    getNewFeeds: () => `${postsUrl}/new-feeds`,
};
const storeFuncPath = {
    getMyStores: () => `${storeUrl}/my-stores`,
    getMyStoresById: (id) => `${storeUrl}/${id}`,
    createStore: () => `${storeUrl}/create`,
    getQrStore: (id) => `${storeUrl}/${id}/get-qr-code`,
};
const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
const getProvincesName = (provinceId) => {
    const name = provinces.find((item) => item.id == provinceId).name;
    return name;
};
const getProvinces = () => {
    const sortedData = [...provinces].sort((a, b) => a.name.localeCompare(b.name, "vi", { sensitivity: "base" }));
    return sortedData;
};
const getNewPost = (user, data) => {
    const newPost = {
        experienceLocation: data.experienceLocation,
        author: {
            username: user.username,
            displayName: user.displayName,
            imageUrl: user.imageUrl,
            badges: user.badges,
        },
        content: data.content,
        imageUrls: data.imageUrls,
        videoUrls: data.videoUrls,
        upvoteCount: data.upvoteCount,
        comments: [],
    };
    return newPost;
};
const getNewComment = (user, data) => {
    const newComment = {
        user: {
            username: user.username,
            displayName: user.displayName,
            imageUrl: user.imageUrl,
            badges: user.badges,
        },
        post: data.post,
        content: data.content,
        imageUrls: data.imageUrls,
        videoUrls: data.videoUrls,
        upvoteCount: data.upvoteCount,
        replies: [],
    };
    return newComment;
};
export {
    formatPrice,
    storeFuncPath,
    getProvinces,
    getNewComment,
    getNewPost,
    getProvincesName,
    locationPath,
    postFuncPath,
};
