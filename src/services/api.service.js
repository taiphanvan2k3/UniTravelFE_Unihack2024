const callAPI = async (url, method = "GET", data = null, headers = {}, setLoading = null) => {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },

        // Bao gồm cookie trong request và giúp nhận cookie từ response
        credentials: "include",
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        if (setLoading) {
            setLoading(true);
        }
        const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}${url}`, options);
        if (!response.ok) {
            return null;
        }

        const responseData = await response.json();
        if (setLoading) {
            setLoading(false);
        }
        return responseData;
    } catch (error) {
        console.error("API call failed:", error);
        return null;
    }
};

export { callAPI };
