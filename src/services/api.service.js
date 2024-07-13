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
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(response.message || "API call failed");
        }
        return responseData;
    } finally {
        if (setLoading) {
            setLoading(false);
        }
    }
};

export { callAPI };
