import React from 'react';

export function ToggleField({ 
  label, 
  checked, 
  onChange, 
  children, 
  error,
  ...props 
}) {
  return (
    <div className="toggle-field">
      <label className="toggle-label">
        <input 
          type="checkbox" 
          checked={checked} 
          onChange={onChange} 
          className="checkbox"
          {...props}
        />
        <span>{label}</span>
      </label>
      {children}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
