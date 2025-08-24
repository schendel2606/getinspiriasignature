import React, { useRef } from 'react';
import { downloadVCard } from '../../utils/vCardGenerator';
import { generateSharableLink, copyToClipboard } from '../../utils/urlPresets';

const actionBtnStyle = {
  background: "#f8f9fa",
  color: "#495057",
  border: "1px solid #dee2e6",
  borderRadius: 8,
  fontWeight: 500,
  fontSize: "0.9em",
  padding: "6px 12px",
  margin: "0 4px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  gap: 6
};

const fileInputStyle = {
  display: "none"
};

export function AdvancedActions({ 
  formData, 
  onImportData, 
  onReset, 
  tab 
}) {
  const fileInputRef = useRef(null);

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'inspiria-signature-settings.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        onImportData(data);
      } catch (error) {
        alert(tab === "he" ? "שגיאה בקריאת הקובץ" : "Error reading file");
      }
    };
    reader.readAsText(file);
  };

  const handleDownloadVCard = () => {
    downloadVCard(formData);
  };

  const handleCopySharableLink = async () => {
    const link = generateSharableLink(formData);
    try {
      await copyToClipboard(link);
      alert(tab === "he" ? "הקישור הועתק!" : "Link copied!");
    } catch (error) {
      alert(tab === "he" ? "שגיאה בהעתקת הקישור" : "Error copying link");
    }
  };

  return (
    <div style={{ 
      marginTop: 20, 
      padding: 16, 
      background: "#f8f9fa", 
      borderRadius: 12, 
      border: "1px solid #e9ecef" 
    }} className="advanced-actions">
      <h3 style={{ 
        margin: "0 0 12px 0", 
        fontSize: "1.1em", 
        color: "#495057",
        fontWeight: 600 
      }}>
        {tab === "he" ? "פעולות מתקדמות" : "Advanced Actions"}
      </h3>
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }} className="advanced-buttons">
        <button 
          style={actionBtnStyle} 
          onClick={handleExportJSON}
          title={tab === "he" ? "ייצא הגדרות לקובץ JSON" : "Export settings to JSON"}
          className="advanced-btn"
        >
          📄 {tab === "he" ? "ייצא הגדרות" : "Export Settings"}
        </button>
        
        <button 
          style={actionBtnStyle} 
          onClick={() => fileInputRef.current?.click()}
          title={tab === "he" ? "ייבא הגדרות מקובץ JSON" : "Import settings from JSON"}
          className="advanced-btn"
        >
          📂 {tab === "he" ? "ייבא הגדרות" : "Import Settings"}
        </button>
        
        <button 
          style={actionBtnStyle} 
          onClick={handleDownloadVCard}
          title={tab === "he" ? "הורד כרטיס ביקור" : "Download vCard"}
          className="advanced-btn"
        >
          👤 {tab === "he" ? "כרטיס ביקור" : "vCard"}
        </button>
        
        <button 
          style={actionBtnStyle} 
          onClick={handleCopySharableLink}
          title={tab === "he" ? "העתק קישור לשיתוף" : "Copy sharable link"}
          className="advanced-btn"
        >
          🔗 {tab === "he" ? "קישור לשיתוף" : "Share Link"}
        </button>
        
        <button 
          style={{ ...actionBtnStyle, color: "#dc3545", borderColor: "#dc3545" }} 
          onClick={onReset}
          title={tab === "he" ? "אפס לברירת מחדל" : "Reset to defaults"}
          className="advanced-btn"
        >
          🔄 {tab === "he" ? "אפס" : "Reset"}
        </button>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImportJSON}
        style={fileInputStyle}
      />
      
      <p style={{ 
        margin: "12px 0 0 0", 
        fontSize: "0.85em", 
        color: "#6c757d",
        lineHeight: 1.4 
      }}>
        {tab === "he" 
          ? "ייצא את ההגדרות שלך לשמירה או שתף קישור עם עמיתים לעבודה" 
          : "Export your settings for backup or share a link with colleagues"
        }
      </p>
    </div>
  );
}
