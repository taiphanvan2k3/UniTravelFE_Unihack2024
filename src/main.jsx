import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { LoadingProvider } from "./contexts/LoadingContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <LoadingProvider>
            <ChakraProvider>
                <App />
            </ChakraProvider>
        </LoadingProvider>
    </AuthProvider>
);
