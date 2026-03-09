import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </ThemeProvider>
  </BrowserRouter>
);