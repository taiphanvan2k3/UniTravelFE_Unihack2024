const setCookie = (key, value, expiredTime) => {
    const date = new Date();
    date.setTime(date.getTime() + expiredTime);
    document.cookie = `${key}=${value}; expires=${date.toUTCString()}; path=/`;
};

const getCookieValue = (key) => {
    const cookie = document.cookie.split("; ").find((row) => row.startsWith(key));
    return cookie ? cookie.split("=")[1] : "";
};

export { setCookie, getCookieValue };
