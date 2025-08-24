import React from 'react';

export function SignaturePreview({ 
  previewRef, 
  signatureHtml, 
  tab, 
  copyStatus, 
  onCopy, 
  onOutlookClick 
}) {
  return (
    <div className="signature-preview">
      <div className="preview-header">
        <span style={{ fontWeight: 700, color: "var(--primary)" }}>תצוגה מקדימה</span>
        <div className="action-buttons">
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
            className="btn action-btn" 
            onClick={onCopy} 
            type="button"
            aria-label="Copy signature to clipboard"
          >
            העתק חתימה
          </button>
          <button 
            className="btn action-btn" 
            type="button" 
            onClick={onOutlookClick}
            aria-label="Open Outlook instructions"
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
        className="preview-content"
        dir={tab === "en" ? "ltr" : "rtl"}
        style={{ textAlign: tab === "en" ? "left" : "right" }}
        dangerouslySetInnerHTML={{ __html: signatureHtml }}
      />
    </div>
  );
}
