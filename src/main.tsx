import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./i18n";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider
    clientId={import.meta.env.VITE_GOOGLE_API_OAUTH_CLIENT_ID}
  >
    <StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StrictMode>
  </GoogleOAuthProvider>
);
