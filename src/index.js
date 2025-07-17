// index.js
import React from "react";
import { createRoot } from "react-dom/client"; // ✅ React 18+ menggunakan ini
import "./index.css";
import App from "./App";

// Ambil elemen root dari HTML
const container = document.getElementById("root");

// Buat root baru
const root = createRoot(container);

// Render komponen utama App ke dalam root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
