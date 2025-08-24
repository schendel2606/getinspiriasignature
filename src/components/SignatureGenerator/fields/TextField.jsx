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

export function TextField({ 
  label, 
  value, 
  onChange, 
  error, 
  type = "text", 
  placeholder, 
  autoComplete = "off",
  id,
  ...props 
}) {
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>{label}</label>
      <input 
        id={id}
        style={inputStyle(!!error)} 
        value={value} 
        onChange={onChange} 
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...props}
      />
      {error && <div style={errorStyle}>{error}</div>}
    </div>
  );
}
