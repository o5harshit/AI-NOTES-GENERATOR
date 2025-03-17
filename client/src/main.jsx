import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PromptProvider } from "../Context/PromptContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PromptProvider>
      <App />
    </PromptProvider>
  </StrictMode>
);
