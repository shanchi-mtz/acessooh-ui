import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";

// Define o tema inicial (só uma vez)
const savedTheme = localStorage.getItem("theme");

// Se o usuário nunca escolheu, começa em dark
if (!savedTheme) {
  localStorage.setItem("theme", "dark");
  document.documentElement.classList.add("dark");
} else if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
