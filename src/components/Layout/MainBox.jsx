import React from 'react';
import { INSPIRIA_LOGO_BG } from '../../constants/icons.js';

const mainBoxStyle = {
  maxWidth: 700,
  width: "99%",
  margin: "55px auto 0 auto",
  background: "rgba(255,255,255,0.97)",
  borderRadius: 22,
  boxShadow: "0 6px 38px #0002",
  padding: "44px 34px 32px 34px",
  position: "relative",
  zIndex: 1,
  minHeight: 550
};

const logoBgStyle = {
  background: `url(${INSPIRIA_LOGO_BG}) no-repeat center center/220px`,
  opacity: 0.09,
  zIndex: 0,
  position: "absolute",
  left: 0, top: 0, width: "100%", height: "100%",
  pointerEvents: "none"
};

export function MainBox({ children }) {
  return (
    <div style={{ position: "relative", minHeight: 550 }}>
      {/* רקע לוגו אינספיריה */}
      <div style={logoBgStyle}></div>
      
      {/* תיבת תוכן מרכזית */}
      <div style={mainBoxStyle}>
        {children}
      </div>
    </div>
  );
}
