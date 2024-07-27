/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                roboto: ["Roboto", "sans-serif"],
                poppins: ["Poppins", "sans-serif"],
            },
            colors: {
                primary: {
                    100: "#04305f",
                    200: "#01a8c9",
                    300: "#2298f4",
                    400: "#78b3f1",
                    500: "#d2dcf5",
                },
                secondary: "#dedcff",
                white: "#fbfbfe",
                black: "#050315",
            },
        },
    },
    plugins: [],
};
