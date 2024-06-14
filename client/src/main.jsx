import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
      <ToastContainer
        position="bottom-left"
        hideProgressBar="false"
        autoClose="6000"
      ></ToastContainer>
    </AuthContextProvider>
  </React.StrictMode>
);
