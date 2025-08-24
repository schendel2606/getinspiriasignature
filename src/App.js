import React, { useEffect } from "react";
import { SignatureGenerator } from "./components/SignatureGenerator/SignatureGenerator";
import { THEME_CSS } from "./styles/themeStyles";

function App() {
  // Inject theme styles on mount
  useEffect(() => {
    const isBrowser = typeof document !== 'undefined';
    if (!isBrowser) return;
    
    if (document.head.querySelector('style[data-inspiria]')) return;
    
    const style = document.createElement('style');
    style.setAttribute('data-inspiria', 'true');
    style.innerHTML = THEME_CSS;
    document.head.appendChild(style);
  }, []);

  return <SignatureGenerator />;
}

export default App;
