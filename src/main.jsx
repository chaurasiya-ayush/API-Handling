import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ContextData from "./Utilities/ContextData.jsx";

createRoot(document.getElementById("root")).render(
  <ContextData>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextData>
);
