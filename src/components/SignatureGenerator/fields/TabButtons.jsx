import React from 'react';

export function TabButtons({ activeTab, onTabChange }) {
  return (
    <div className="tab-buttons">
      <button 
        type="button" 
        className={`tab-btn ${activeTab === "he" ? 'active' : ''}`}
        onClick={() => onTabChange("he")}
        aria-label="Switch to Hebrew"
      >
        חתימה בעברית
      </button>
      <button 
        type="button" 
        className={`tab-btn ${activeTab === "en" ? 'active' : ''}`}
        onClick={() => onTabChange("en")}
        aria-label="Switch to English"
      >
        חתימה באנגלית
      </button>
    </div>
  );
}
