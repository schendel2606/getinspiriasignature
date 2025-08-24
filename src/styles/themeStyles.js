export const THEME_CSS = `
body.light-mode { background: #f6fafd !important; color: #1a237e; }
body.dark-mode { background: #181a1b !important; color: #f2f2f2 !important; }
body.light-mode input, body.light-mode select { background: #fff !important; color: #222 !important; }
body.dark-mode input, body.dark-mode select { background: #23262f !important; color: #f2f2f2 !important; }
body.light-mode .main-box { background: #fff !important; }
body.dark-mode .main-box { background: #23272e !important; }
body.dark-mode .tab-btn { background: #1e2227 !important; color: #8bb8f9 !important; }
body.dark-mode .tab-btn.active { background: #23272e !important; color: #fff !important; }
body.dark-mode .mode-select { background: #23262f !important; color: #8bb8f9 !important; border: 1px solid #394355 !important; }
body.dark-mode .mode-select:focus { outline: none; }
body.dark-mode .link-btn, body.dark-mode button, body.dark-mode select { background: #23262f !important; border: 1px solid #394355 !important; color: #8bb8f9 !important; }
body.dark-mode .link-btn:hover, body.dark-mode button:hover { background: #2e3647 !important; border: 1.5px solid #72a1ff !important; color: #b8daff !important; }

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  /* Main container adjustments */
  .main-box {
    margin: 20px auto 0 auto !important;
    padding: 24px 20px 20px 20px !important;
    border-radius: 16px !important;
    min-height: auto !important;
    width: 95% !important;
    max-width: none !important;
  }
  
  /* Header adjustments */
  .mobile-header h1 {
    font-size: 1.4em !important;
    margin: 0 0 6px 0 !important;
  }
  
  .mobile-header p {
    font-size: 0.9em !important;
    line-height: 1.4 !important;
  }
  
  /* Form layout - stack vertically on mobile */
  .form-row {
    flex-direction: column !important;
    gap: 16px !important;
    margin-bottom: 16px !important;
  }
  
  .form-col {
    flex: none !important;
    width: 100% !important;
  }
  
  /* Input fields - larger touch targets */
  input, select, textarea {
    font-size: 16px !important; /* Prevents zoom on iOS */
    padding: 12px 16px !important;
    border-radius: 8px !important;
    min-height: 48px !important; /* Better touch target */
  }
  
  /* Labels - better mobile spacing */
  label {
    font-size: 0.95em !important;
    margin-bottom: 6px !important;
    font-weight: 600 !important;
  }
  
  /* Buttons - larger touch targets */
  button {
    min-height: 48px !important;
    padding: 12px 20px !important;
    font-size: 16px !important;
    border-radius: 8px !important;
    font-weight: 600 !important;
  }
  
  /* Tab buttons - full width on mobile */
  .tab-buttons {
    display: flex !important;
    width: 100% !important;
    gap: 0 !important;
  }
  
  .tab-btn {
    flex: 1 !important;
    padding: 12px 8px !important;
    font-size: 14px !important;
    min-height: 48px !important;
  }
  
  /* Mode selector - reposition for mobile */
  .mode-selector {
    position: fixed !important;
    top: 12px !important;
    right: 12px !important;
    z-index: 100 !important;
    padding: 8px 12px !important;
    font-size: 14px !important;
    border-radius: 20px !important;
  }
  
  /* Preview section - better mobile layout */
  .signature-preview {
    margin-top: 24px !important;
    padding: 16px !important;
    border-radius: 12px !important;
  }
  
  .preview-content {
    font-size: 14px !important;
    line-height: 1.5 !important;
  }
  
  /* Action buttons - stack vertically on mobile */
  .action-buttons {
    flex-direction: column !important;
    gap: 12px !important;
  }
  
  .action-btn {
    width: 100% !important;
    justify-content: center !important;
    padding: 14px 20px !important;
  }
  
  /* Advanced actions - mobile optimized */
  .advanced-actions {
    margin-top: 24px !important;
    padding: 16px !important;
    border-radius: 12px !important;
  }
  
  .advanced-buttons {
    flex-direction: column !important;
    gap: 10px !important;
  }
  
  .advanced-btn {
    width: 100% !important;
    justify-content: center !important;
    padding: 12px 16px !important;
    font-size: 14px !important;
  }
  
  /* Toggle fields - better mobile layout */
  .toggle-field {
    margin-bottom: 16px !important;
  }
  
  .toggle-label {
    font-size: 16px !important;
    padding: 12px 0 !important;
  }
  
  /* Error messages - mobile friendly */
  .error-message {
    font-size: 13px !important;
    margin-top: 4px !important;
    padding: 8px 12px !important;
    border-radius: 6px !important;
  }
  
  /* Modal adjustments for mobile */
  .modal-content {
    margin: 20px !important;
    padding: 20px !important;
    border-radius: 12px !important;
    max-height: 80vh !important;
    overflow-y: auto !important;
    width: calc(100% - 40px) !important;
    max-width: 400px !important;
  }
  
  /* Notification adjustments */
  .success-notification {
    top: 10px !important;
    right: 10px !important;
    left: 10px !important;
    max-width: none !important;
    border-radius: 8px !important;
    font-size: 14px !important;
  }
  
  /* Extension field - smaller on mobile */
  .extension-field {
    max-width: 100% !important;
  }
  
  /* Greeting field - full width on mobile */
  .greeting-field {
    flex: 1 !important;
  }
  
  /* Preview header - mobile optimized */
  .preview-header {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 12px !important;
  }
}

/* Small mobile devices */
@media (max-width: 480px) {
  .main-box {
    margin: 10px auto 0 auto !important;
    padding: 20px 16px 16px 16px !important;
    width: 98% !important;
  }
  
  .mobile-header h1 {
    font-size: 1.3em !important;
  }
  
  .mobile-header p {
    font-size: 0.85em !important;
  }
  
  input, select, textarea {
    padding: 10px 14px !important;
    font-size: 16px !important;
  }
  
  button {
    padding: 10px 16px !important;
    font-size: 15px !important;
  }
  
  .tab-btn {
    padding: 10px 6px !important;
    font-size: 13px !important;
  }
  
  .mode-selector {
    top: 8px !important;
    right: 8px !important;
    padding: 6px 10px !important;
    font-size: 13px !important;
  }
  
  .modal-content {
    margin: 10px !important;
    padding: 16px !important;
    width: calc(100% - 20px) !important;
  }
}

/* Landscape mobile */
@media (max-width: 768px) and (orientation: landscape) {
  .main-box {
    margin: 10px auto 0 auto !important;
    padding: 16px 20px !important;
  }
  
  .form-row {
    flex-direction: row !important;
    gap: 12px !important;
  }
  
  .form-col {
    flex: 1 !important;
  }
  
  .action-buttons {
    flex-direction: row !important;
    gap: 8px !important;
  }
  
  .action-btn {
    width: auto !important;
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  /* Larger touch targets for touch devices */
  button, input, select, .tab-btn {
    min-height: 44px !important;
  }
  
  /* Better spacing for touch */
  .form-row {
    gap: 20px !important;
  }
  
  /* Prevent text selection on buttons */
  button {
    -webkit-touch-callout: none !important;
    -webkit-user-select: none !important;
    user-select: none !important;
  }
  
  /* Touch feedback */
  button:active {
    transform: scale(0.98) !important;
    transition: transform 0.1s ease !important;
  }
  
  /* Better scrolling */
  .modal-content {
    -webkit-overflow-scrolling: touch !important;
  }
}

/* High DPI displays */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .main-box {
    box-shadow: 0 6px 38px rgba(0,0,0,0.15) !important;
  }
}

/* iOS Safari specific fixes */
@supports (-webkit-touch-callout: none) {
  /* Prevent zoom on input focus */
  input, select, textarea {
    font-size: 16px !important;
  }
  
  /* Better scrolling on iOS */
  body {
    -webkit-overflow-scrolling: touch !important;
  }
}

/* Android Chrome specific fixes */
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  /* Fix for Android Chrome input styling */
  input, select, textarea {
    -webkit-appearance: none !important;
    border-radius: 8px !important;
  }
}

/* Focus states for accessibility */
@media (prefers-reduced-motion: no-preference) {
  button:focus, input:focus, select:focus {
    outline: 2px solid #2678ee !important;
    outline-offset: 2px !important;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;
