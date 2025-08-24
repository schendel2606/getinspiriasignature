import React from 'react';

export function OutlookModal({ isOpen, onClose, onCopy }) {
  if (!isOpen) return null;

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
      <div className="modal-content">
        <button 
          style={{
            position: "absolute", 
            left: 16, 
            top: 12, 
            fontSize: 18, 
            background: "none", 
            border: "none", 
            color: "var(--muted)", 
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
          <span style={{ fontWeight: 700, fontSize: "1.16em", color: "var(--primary)" }}>
            הוראות לאאוטלוק
          </span>
        </div>
        <ol style={{ paddingRight: 15, color: "var(--fg)", fontSize: "1.08em", direction: "rtl", textAlign: "right" }}>
          <li>העתק את החתימה באמצעות הכפתור.</li>
          <li>לחץ על כפתור <b>עבור לאאוטלוק</b> למטה.</li>
          <li>היכנס ל־אאוטלוק &gt; הגדרות &gt; הצג את כל הגדרות אאוטלוק &gt; דואר &gt; חתימות.</li>
          <li>הדבק את החתימה בתיבת העריכה.</li>
          <li>שמור. זהו!</li>
        </ol>
        <div className="action-buttons" style={{ marginTop: 18, justifyContent: "flex-end" }}>
          <button 
            className="btn action-btn" 
            onClick={onCopy}
            aria-label="Copy signature"
          >
            העתק חתימה
          </button>
          <a
            href="https://outlook.live.com/mail/0/options/mail/layout/signature"
            target="_blank" 
            rel="noopener noreferrer"
            className="btn action-btn"
            style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
            aria-label="Open Outlook settings"
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
