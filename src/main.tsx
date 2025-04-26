import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId="12627556403-bhd69hkr906g0fdtd521b60mv9e1a5m0.apps.googleusercontent.com">
        <StrictMode>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </StrictMode>
    </GoogleOAuthProvider>
);
