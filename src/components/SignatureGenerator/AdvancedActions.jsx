import React, { useRef } from 'react';
import { downloadVCard } from '../../utils/vCardGenerator';
import { generateSharableLink, copyToClipboard } from '../../utils/urlPresets';

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
    <div className="advanced-actions">
      <h3 style={{ 
        margin: "0 0 12px 0", 
        fontSize: "1.1em", 
        color: "var(--fg)",
        fontWeight: 600 
      }}>
        {tab === "he" ? "פעולות מתקדמות" : "Advanced Actions"}
      </h3>
      
      <div className="advanced-buttons">
        <button 
          className="btn advanced-btn" 
          onClick={handleExportJSON}
          title={tab === "he" ? "ייצא הגדרות לקובץ JSON" : "Export settings to JSON"}
        >
          📄 {tab === "he" ? "ייצא הגדרות" : "Export Settings"}
        </button>
        
        <button 
          className="btn advanced-btn" 
          onClick={() => fileInputRef.current?.click()}
          title={tab === "he" ? "ייבא הגדרות מקובץ JSON" : "Import settings from JSON"}
        >
          📂 {tab === "he" ? "ייבא הגדרות" : "Import Settings"}
        </button>
        
        <button 
          className="btn advanced-btn" 
          onClick={handleDownloadVCard}
          title={tab === "he" ? "הורד כרטיס ביקור" : "Download vCard"}
        >
          👤 {tab === "he" ? "כרטיס ביקור" : "vCard"}
        </button>
        
        <button 
          className="btn advanced-btn" 
          onClick={handleCopySharableLink}
          title={tab === "he" ? "העתק קישור לשיתוף" : "Copy sharable link"}
        >
          🔗 {tab === "he" ? "קישור לשיתוף" : "Share Link"}
        </button>
        
        <button 
          className="btn advanced-btn" 
          style={{ color: "#dc3545", borderColor: "#dc3545" }}
          onClick={onReset}
          title={tab === "he" ? "אפס לברירת מחדל" : "Reset to defaults"}
        >
          🔄 {tab === "he" ? "אפס" : "Reset"}
        </button>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImportJSON}
        style={{ display: "none" }}
      />
      
      <p style={{ 
        margin: "12px 0 0 0", 
        fontSize: "0.85em", 
        color: "var(--muted)",
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
