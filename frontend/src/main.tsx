import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { ThemeProvider } from "./context/ThemeProvider.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
     <ThemeProvider>
    <App />
  </ThemeProvider>
    </BrowserRouter>
  </AuthProvider>
);