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
                    100: "#2f27ce",
                    200: "#433bff",
                },
                secondary: "#dedcff",
                white: "#fbfbfe",
                black: "#050315",
            },
        },
    },
    plugins: [],
};
