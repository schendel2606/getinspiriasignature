import React from 'react';

export function MainBox({ children }) {
  return (
    <div style={{ position: "relative", minHeight: 550 }}>
      {/* תיבת תוכן מרכזית */}
      <div className="panel">
        {children}
      </div>
    </div>
  );
}
