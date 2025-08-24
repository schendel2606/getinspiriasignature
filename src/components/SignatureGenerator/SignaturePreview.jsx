import React from 'react';

export function SignaturePreview({ 
  previewRef, 
  signatureHtml, 
  tab, 
  copyStatus, 
  onCopy, 
  onOutlookClick 
}) {
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
    <div style={{ marginTop: 30, background: "#f6fafd", borderRadius: 12, padding: 16, minHeight: 60 }} className="signature-preview">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }} className="preview-header">
        <span style={{ fontWeight: 700, color: "#1a237e" }}>תצוגה מקדימה</span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="action-buttons">
          {copyStatus && (
            <span 
              style={{ 
                color: copyStatus.includes("שגיאה") || copyStatus.includes("error") ? "#e74c3c" : "#27ae60",
                fontSize: "0.9em",
                fontWeight: 600
              }}
              aria-live="polite"
            >
              {copyStatus}
            </span>
          )}
          <button 
            style={smallBtnStyle} 
            onClick={onCopy} 
            type="button"
            aria-label="Copy signature to clipboard"
            className="action-btn"
          >
            העתק חתימה
          </button>
          <button 
            style={smallBtnStyle} 
            type="button" 
            onClick={onOutlookClick}
            aria-label="Open Outlook instructions"
            className="action-btn"
          >
            <img 
              src="https://img.icons8.com/color/96/microsoft-outlook-2019.png" 
              alt="Outlook" 
              style={{ width: 19, verticalAlign: "middle", marginLeft: 5, borderRadius: "40%" }} 
            />
            עבור לאאוטלוק
          </button>
        </div>
      </div>
      <div
        ref={previewRef}
        style={{
          background: "#fff",
          borderRadius: 10,
          padding: 18,
          minHeight: 60,
          textAlign: tab === "he" ? "right" : "left",
          direction: tab === "he" ? "rtl" : "ltr"
        }}
        className="preview-content"
        dangerouslySetInnerHTML={{ __html: signatureHtml }}
      />
    </div>
  );
}
