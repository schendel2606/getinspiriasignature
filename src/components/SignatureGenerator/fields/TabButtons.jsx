import React from 'react';

const tabBtnStyle = (active) => ({
  background: active ? "#2678ee" : "#f3f7fc",
  color: active ? "#fff" : "#2678ee",
  border: "none",
  borderRadius: "13px 13px 0 0",
  fontWeight: 700,
  fontSize: "1.11em",
  padding: "10px 38px",
  cursor: "pointer",
  marginRight: 8,
  boxShadow: active ? "0 2px 18px #2678ee18" : undefined,
  borderBottom: active ? "2.5px solid #2678ee" : "2.5px solid #f3f7fc"
});

export function TabButtons({ activeTab, onTabChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 18 }}>
      <button 
        type="button" 
        style={tabBtnStyle(activeTab === "he")} 
        onClick={() => onTabChange("he")}
        aria-label="Switch to Hebrew"
      >
        חתימה בעברית
      </button>
      <button 
        type="button" 
        style={tabBtnStyle(activeTab === "en")} 
        onClick={() => onTabChange("en")}
        aria-label="Switch to English"
      >
        חתימה באנגלית
      </button>
    </div>
  );
}
