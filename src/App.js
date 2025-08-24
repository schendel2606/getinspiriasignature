import React, { useEffect } from "react";
import { SignatureGenerator } from "./components/SignatureGenerator/SignatureGenerator";
import "./styles/theme.css";

function App() {
  useEffect(() => {
    const isBrowser = typeof document !== 'undefined';
    if (!isBrowser) return;
    
    // Set entire app to RTL by default
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "he");
    
    // Apply theme class to document.documentElement instead of body
    const savedTheme = localStorage.getItem('color-mode') || 'system';
    const applyTheme = (theme) => {
      document.documentElement.classList.remove('light', 'dark');
      if (theme !== 'system') {
        document.documentElement.classList.add(theme);
      }
    };
    
    applyTheme(savedTheme);
  }, []);

  return <SignatureGenerator />;
}

export default App;
