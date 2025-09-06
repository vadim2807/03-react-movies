import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import './index.css'
import App from './components/App/App'
import "modern-normalize";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>
);

