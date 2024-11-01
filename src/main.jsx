import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QuranPage } from "./pages/quran";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QuranPage />
  </StrictMode>
);
