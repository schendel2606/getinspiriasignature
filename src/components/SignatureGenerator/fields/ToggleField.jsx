import React from 'react';

const labelStyle = { fontWeight: 500, marginBottom: 3, color: "#1a237e", fontSize: 16 };

const inputStyle = (hasError = false) => ({
  border: hasError ? "1.5px solid #e74c3c" : "1.5px solid #bce",
  borderRadius: 8,
  padding: "10px 10px",
  fontSize: "1.1em",
  background: "#fff",
  color: "#222",
  outline: "none",
  minWidth: 0,
  width: "100%",
  transition: "border-color 0.2s ease"
});

const errorStyle = {
  color: "#e74c3c",
  fontSize: "0.85em",
  marginTop: 2,
  fontWeight: 500
};

const checkStyle = { marginRight: 9, transform: "scale(1.11)" };

const tooltipIconStyle = {
  color: "#2678ee",
  cursor: "help",
  fontWeight: 800,
  marginLeft: 5,
  fontSize: "1.1em",
  display: "inline-block"
};

export function ToggleField({ 
  label, 
  checked, 
  onChange, 
  children, 
  showHint = false,
  hintTitle,
  error,
  ...props 
}) {
  return (
    <div>
      <label style={{ ...labelStyle, display: "flex", alignItems: "center" }}>
        <input 
          type="checkbox" 
          checked={checked} 
          onChange={onChange} 
          style={checkStyle}
          {...props}
        />
        <span title={hintTitle}>
          {label}
          {showHint && (
            <span style={tooltipIconStyle} title={hintTitle}>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#2678ee" strokeWidth="2"/>
                <text x="7.5" y="12" textAnchor="middle" fontSize="12" fill="#2678ee" fontWeight="bold">i</text>
              </svg>
            </span>
          )}
        </span>
      </label>
      {children}
      {error && <div style={errorStyle}>{error}</div>}
    </div>
  );
}
