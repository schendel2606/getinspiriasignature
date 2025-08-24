import React from 'react';

export function OutlookModal({ isOpen, onClose, onCopy }) {
  if (!isOpen) return null;

  const smallBtnStyle = {
    background: "#eaf2fa",
    color: "#2583d1",
    border: "1px solid #b3d2ef",
    borderRadius: 9,
    fontWeight: 600,
    fontSize: "1em",
    padding: "7px 19px",
    margin: "0 7px",
    cursor: "pointer",
    transition: "all .16s"
  };

  return (
    <div style={{
      position: "fixed", 
      zIndex: 50, 
      top: 0, 
      left: 0, 
      width: "100vw", 
      height: "100vh",
      background: "rgba(0,0,0,0.28)", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center"
    }}>
      <div style={{
        background: "#fff", 
        padding: 28, 
        borderRadius: 20, 
        width: 390, 
        boxShadow: "0 2px 18px #2678ee24",
        position: "relative", 
        textAlign: "right"
      }} className="modal-content">
        <button 
          style={{
            position: "absolute", 
            left: 16, 
            top: 12, 
            fontSize: 18, 
            background: "none", 
            border: "none", 
            color: "#999", 
            cursor: "pointer"
          }} 
          onClick={onClose}
          aria-label="Close modal"
        >
          &#10005;
        </button>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <img 
            src="https://img.icons8.com/color/96/microsoft-outlook-2019.png" 
            alt="Outlook" 
            style={{ width: 34, marginLeft: 7 }} 
          />
          <span style={{ fontWeight: 700, fontSize: "1.16em", color: "#1a237e" }}>
            הוראות לאאוטלוק
          </span>
        </div>
        <ol style={{ paddingRight: 15, color: "#222", fontSize: "1.08em", direction: "rtl", textAlign: "right" }}>
          <li>העתק את החתימה באמצעות הכפתור.</li>
          <li>לחץ על כפתור <b>עבור לאאוטלוק</b> למטה.</li>
          <li>היכנס ל־אאוטלוק &gt; הגדרות &gt; הצג את כל הגדרות אאוטלוק &gt; דואר &gt; חתימות.</li>
          <li>הדבק את החתימה בתיבת העריכה.</li>
          <li>שמור. זהו!</li>
        </ol>
        <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end", gap: 8 }} className="action-buttons">
          <button 
            style={smallBtnStyle} 
            onClick={onCopy}
            aria-label="Copy signature"
            className="action-btn"
          >
            העתק חתימה
          </button>
          <a
            href="https://outlook.live.com/mail/0/options/mail/layout/signature"
            target="_blank" 
            rel="noopener noreferrer"
            style={{ ...smallBtnStyle, textDecoration: "none", display: "flex", alignItems: "center" }}
            aria-label="Open Outlook settings"
            className="action-btn"
          >
            <img 
              src="https://img.icons8.com/color/96/microsoft-outlook-2019.png" 
              alt="Outlook" 
              style={{ width: 18, marginLeft: 6, borderRadius: "40%" }} 
            />
            עבור לאאוטלוק
          </a>
        </div>
      </div>
    </div>
  );
}
