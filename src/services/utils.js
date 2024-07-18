const setCookie = (key, value, expiredTime) => {
    const date = new Date();
    date.setTime(date.getTime() + expiredTime);
    document.cookie = `${key}=${value}; expires=${date.toUTCString()}; path=/`;
};

const getCookieValue = (key) => {
    const cookie = document.cookie.split("; ").find((row) => row.startsWith(key));
    return cookie ? cookie.split("=")[1] : "";
};
function extractTextFromDescription(description) {
    // Step 1: Create a new DOMParser instance
    const parser = new DOMParser();

    // Step 2: Parse the description as HTML
    const doc = parser.parseFromString(description, "text/html");

    // Step 3: Query for <span> and <p> elements
    const elements = doc.querySelectorAll("span, p");

    // Step 4: Extract and concatenate the text content of each element
    const extractedText = Array.from(elements)
        .map((element) => element.textContent)
        .join(" ");

    // Step 5: Return the extracted text
    return extractedText;
}
export { setCookie, getCookieValue, extractTextFromDescription };
