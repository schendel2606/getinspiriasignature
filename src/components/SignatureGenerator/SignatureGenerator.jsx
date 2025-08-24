import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { TextField } from "./fields/TextField";
import { ToggleField } from "./fields/ToggleField";
import { TabButtons } from "./fields/TabButtons";
import { SignaturePreview } from "./SignaturePreview";
import { OutlookModal } from "./OutlookModal";
import { AdvancedActions } from "./AdvancedActions";
import { SuccessNotification } from "./SuccessNotification";
import { MainBox } from "../Layout/MainBox";
import { useColorMode } from "../../hooks/useColorMode";
import { useClipboardHtml } from "../../hooks/useClipboardHtml";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { buildSignatureHtml } from "../../utils/buildSignatureHtml";
import { validateForm, isNonEmpty, isValidLinkedin } from "../../utils/validation";
import { getPresetFromURL } from "../../utils/urlPresets";
import { GREETING_DEFAULTS } from "../../constants/defaults";

export function SignatureGenerator() {
  // Check for URL preset first
  const urlPreset = getPresetFromURL();
  
  const [tab, setTab] = useLocalStorage("signature-tab", urlPreset?.tab || "he");
  const [name, setName] = useLocalStorage("signature-name", urlPreset?.name || "");
  const [role, setRole] = useLocalStorage("signature-role", urlPreset?.role || "");
  const [email, setEmail] = useLocalStorage("signature-email", urlPreset?.email || "");
  const [phone, setPhone] = useLocalStorage("signature-phone", urlPreset?.phone || "");
  const [ext, setExt] = useLocalStorage("signature-ext", urlPreset?.ext || "");
  const [linkedin, setLinkedin] = useLocalStorage("signature-linkedin", urlPreset?.linkedin || "");
  const [showGreeting, setShowGreeting] = useLocalStorage("signature-showGreeting", urlPreset?.showGreeting || false);
  const [greeting, setGreeting] = useLocalStorage("signature-greeting", urlPreset?.greeting || GREETING_DEFAULTS.he);
  const [showOutlook, setShowOutlook] = useState(false);
  const [errors, setErrors] = useState({});
  const [copyStatus, setCopyStatus] = useState("");
  const [notification, setNotification] = useState({ message: "", isVisible: false });

  const { mode, setMode } = useColorMode();
  const { copyHtml } = useClipboardHtml();
  const previewRef = useRef(null);

  // Data-driven inclusion logic
  const includePhone = isNonEmpty(phone);
  const includeLinkedin = isValidLinkedin(linkedin);

  // Create formData object early
  const formData = useMemo(() => ({
    name, role, email, phone, includePhone, ext, includeLinkedin, linkedin, showGreeting, greeting, tab
  }), [name, role, email, phone, includePhone, ext, includeLinkedin, linkedin, showGreeting, greeting, tab]);

  // Debounced signature HTML generation
  const [debouncedSignatureHtml, setDebouncedSignatureHtml] = useState("");
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const html = buildSignatureHtml({
        tab,
        name,
        role,
        email,
        phone,
        showPhone: includePhone,
        ext,
        showLinkedin: includeLinkedin,
        linkedin,
        showGreeting,
        greeting
      });
      setDebouncedSignatureHtml(html);
    }, 100);

    return () => clearTimeout(timer);
  }, [tab, name, role, email, phone, includePhone, ext, includeLinkedin, linkedin, showGreeting, greeting]);

  // Update greeting when tab changes
  useEffect(() => {
    setGreeting(GREETING_DEFAULTS[tab]);
  }, [tab, setGreeting]);

  // Keyboard shortcuts
  useEffect(() => {
    const isBrowser = typeof document !== 'undefined';
    if (!isBrowser) return;

    function handleKeyDown(event) {
      // Ctrl+Enter to copy signature
      if (event.ctrlKey && event.key === 'Enter') {
        event.preventDefault();
        handleCopy();
      }
      
      // Ctrl+S to export settings
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
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
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [formData]);

  const handleThemeToggle = useCallback(() => {
    const themes = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(mode);
    const nextIndex = (currentIndex + 1) % themes.length;
    setMode(themes[nextIndex]);
  }, [mode, setMode]);

  const handleCopy = useCallback(() => {
    if (!previewRef.current) return;
    
    const validationErrors = validateForm(formData, tab);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setCopyStatus(tab === "he" ? "אנא תקן את השגיאות לפני ההעתקה" : "Please fix errors before copying");
      
      // Focus first invalid field and scroll into view
      const firstErrorField = Object.keys(validationErrors)[0];
      const fieldElement = document.getElementById(firstErrorField);
      if (fieldElement) {
        fieldElement.focus();
        fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      setTimeout(() => setCopyStatus(""), 3000);
      return;
    }
    
    copyHtml(previewRef.current, setCopyStatus);
    setTimeout(() => setCopyStatus(""), 3000);
  }, [formData, tab, copyHtml]);

  const clearError = useCallback((fieldName) => {
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: null }));
    }
  }, [errors]);

  const handleImportData = useCallback((data) => {
    if (data.name) setName(data.name);
    if (data.role) setRole(data.role);
    if (data.email) setEmail(data.email);
    if (data.phone) setPhone(data.phone);
    if (data.ext) setExt(data.ext);
    if (data.linkedin) setLinkedin(data.linkedin);
    if (data.showGreeting !== undefined) setShowGreeting(data.showGreeting);
    if (data.greeting) setGreeting(data.greeting);
    if (data.tab) setTab(data.tab);
    
    setNotification({
      message: tab === "he" ? "ההגדרות יובאו בהצלחה!" : "Settings imported successfully!",
      isVisible: true
    });
  }, [setName, setRole, setEmail, setPhone, setExt, setLinkedin, setShowGreeting, setGreeting, setTab, tab]);

  const handleReset = useCallback(() => {
    setName("");
    setRole("");
    setEmail("");
    setPhone("");
    setExt("");
    setLinkedin("");
    setShowGreeting(false);
    setGreeting(GREETING_DEFAULTS.he);
    setTab("he");
    setErrors({});
  }, [setName, setRole, setEmail, setPhone, setExt, setLinkedin, setShowGreeting, setGreeting, setTab]);

  const getThemeIcon = () => {
    switch (mode) {
      case 'dark': return '🌙';
      case 'light': return '🌞';
      case 'system': return '🖥️';
      default: return '🌞';
    }
  };

  return (
    <>
      {/* Theme toggle button */}
      <button 
        className="theme-toggle"
        onClick={handleThemeToggle}
        aria-label={tab === "he" ? "החלף מצב תצוגה" : "Toggle theme"}
        type="button"
      >
        {getThemeIcon()}
      </button>

      <MainBox>
        {/* Header with instructions */}
        <div className="mobile-header" style={{ textAlign: "center", marginBottom: 24 }}>
          <h1>
            {tab === "he" ? "יוצר חתימת אימייל אינספיריה" : "Inspiria Email Signature Generator"}
          </h1>
          <p>
            {tab === "he" 
              ? "מלא את הפרטים שלך וצור חתימת אימייל מקצועית" 
              : "Fill in your details and create a professional email signature"
            }
          </p>
        </div>

        <TabButtons activeTab={tab} onTabChange={setTab} />

        {/* Row 1 */}
        <div className="form-row cols-3">
          <div>
            <TextField
              id="name"
              label="שם מלא"
              value={name}
              onChange={e => {
                setName(e.target.value);
                clearError('name');
              }}
              error={errors.name}
            />
          </div>
          <div>
            <TextField
              id="role"
              label="תפקיד"
              value={role}
              onChange={e => {
                setRole(e.target.value);
                clearError('role');
              }}
              error={errors.role}
            />
          </div>
          <div>
            <TextField
              id="email"
              label="כתובת דוא״ל"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                clearError('email');
              }}
              type="email"
              error={errors.email}
            />
          </div>
        </div>

        {/* Row 2 - Always show LinkedIn and Phone inputs */}
        <div className="form-row cols-2">
          <div>
            <TextField
              id="phone"
              label="טלפון נייד"
              value={phone}
              onChange={e => {
                setPhone(e.target.value);
                clearError('phone');
              }}
              error={errors.phone}
            />
          </div>
          <div>
            <TextField
              id="linkedin"
              label="קישור לינקדין"
              value={linkedin}
              onChange={e => {
                setLinkedin(e.target.value);
                clearError('linkedin');
              }}
              placeholder="קישור לפרופיל לינקדין"
              error={errors.linkedin}
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="form-row cols-2">
          <div>
            <TextField
              id="ext"
              label="שלוחה"
              value={ext}
              onChange={e => setExt(e.target.value)}
            />
          </div>
          <div>
            <ToggleField
              label="הוסף ברכה"
              checked={showGreeting}
              onChange={() => setShowGreeting(!showGreeting)}
            >
              {showGreeting && (
                <TextField
                  id="greeting"
                  value={greeting}
                  onChange={e => setGreeting(e.target.value)}
                  placeholder={tab === "he" ? "בברכה," : "Best Regards,"}
                />
              )}
            </ToggleField>
          </div>
        </div>

        <SignaturePreview
          previewRef={previewRef}
          signatureHtml={debouncedSignatureHtml}
          tab={tab}
          copyStatus={copyStatus}
          onCopy={handleCopy}
          onOutlookClick={() => setShowOutlook(true)}
        />

        <AdvancedActions
          formData={formData}
          onImportData={handleImportData}
          onReset={handleReset}
          tab={tab}
        />
      </MainBox>

      <OutlookModal
        isOpen={showOutlook}
        onClose={() => setShowOutlook(false)}
        onCopy={handleCopy}
      />

      <SuccessNotification
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={() => setNotification({ message: "", isVisible: false })}
      />
    </>
  );
}
