import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
/* {{CSS_IMPORT}} */
import "./wdyr";
import App from "@/pages/App";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
