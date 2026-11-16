/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";

export const toggleTheame = createContext();

export function TheameContextProvider({ children }) {
  const [mode, setMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("blogpost_theme");
      if (savedTheme === "dark" || savedTheme === "light") {
        return savedTheme;
      }
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    } catch {
      // Fallback
    }
    return "light";
  });

  useEffect(() => {
    try {
      localStorage.setItem("blogpost_theme", mode);
    } catch {
      // Ignore
    }
    document.documentElement.setAttribute("data-theme", mode);
    if (mode === "dark") {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <toggleTheame.Provider value={{ mode, toggleMode }}>
      {children}
    </toggleTheame.Provider>
  );
}

export default TheameContextProvider;
