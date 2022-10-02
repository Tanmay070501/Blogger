import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthCtxProvider } from "./context/AuthCtx";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthCtxProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthCtxProvider>
    </React.StrictMode>
);
