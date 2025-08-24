import React from 'react';

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
      <label htmlFor={id} className="label">{label}</label>
      <input 
        id={id}
        className={`input ${error ? 'error' : ''}`}
        value={value} 
        onChange={onChange} 
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...props}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
