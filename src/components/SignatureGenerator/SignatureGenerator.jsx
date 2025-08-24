import React, { useState, useRef, useEffect } from "react";
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
import { validateForm } from "../../utils/validation";
import { getPresetFromURL } from "../../utils/urlPresets";
import { GREETING_DEFAULTS } from "../../constants/defaults";

const rowStyle = {
  display: "flex",
  flexDirection: "row",
  gap: 24,
  alignItems: "flex-end",
  marginBottom: 18
};

const colStyle = { display: "flex", flexDirection: "column", flex: 1, gap: 4 };

const modeSelectStyle = {
  position: "absolute",
  top: 18,
  right: 18,
  zIndex: 40,
  border: "1.5px solid #b3d2ef",
  borderRadius: 13,
  padding: "7px 17px",
  fontWeight: 600,
  fontSize: "1em",
  color: "#2678ee",
  background: "#f3f7fc"
};

export function SignatureGenerator() {
  // Check for URL preset first
  const urlPreset = getPresetFromURL();
  
  const [tab, setTab] = useLocalStorage("signature-tab", urlPreset?.tab || "he");
  const [name, setName] = useLocalStorage("signature-name", urlPreset?.name || "");
  const [role, setRole] = useLocalStorage("signature-role", urlPreset?.role || "");
  const [email, setEmail] = useLocalStorage("signature-email", urlPreset?.email || "");
  const [phone, setPhone] = useLocalStorage("signature-phone", urlPreset?.phone || "");
  const [showPhone, setShowPhone] = useLocalStorage("signature-showPhone", urlPreset?.showPhone || false);
  const [ext, setExt] = useLocalStorage("signature-ext", urlPreset?.ext || "");
  const [showLinkedin, setShowLinkedin] = useLocalStorage("signature-showLinkedin", urlPreset?.showLinkedin || false);
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

  // Create formData object early
  const formData = {
    name, role, email, phone, showPhone, ext, showLinkedin, linkedin, showGreeting, greeting, tab
  };

  // Update greeting when tab changes
  useEffect(() => {
    setGreeting(GREETING_DEFAULTS[tab]);
  }, [tab]);

  // Set document direction
  useEffect(() => {
    const isBrowser = typeof document !== 'undefined';
    if (!isBrowser) return;
    
    document.documentElement.setAttribute("dir", "rtl");
    document.body.style.direction = "rtl";
    document.body.style.textAlign = "right";
    
    return () => {
      document.documentElement.setAttribute("dir", "ltr");
      document.body.style.direction = "";
      document.body.style.textAlign = "";
    };
  }, []);

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

  function handleModeChange(e) {
    setMode(e.target.value);
  }

  function handleCopy() {
    if (!previewRef.current) return;
    
    const validationErrors = validateForm(formData, tab);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setCopyStatus(tab === "he" ? "אנא תקן את השגיאות לפני ההעתקה" : "Please fix errors before copying");
      setTimeout(() => setCopyStatus(""), 3000);
      return;
    }
    
    copyHtml(previewRef.current, setCopyStatus);
    setTimeout(() => setCopyStatus(""), 3000);
  }

  function clearError(fieldName) {
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: null }));
    }
  }

  function handleImportData(data) {
    if (data.name) setName(data.name);
    if (data.role) setRole(data.role);
    if (data.email) setEmail(data.email);
    if (data.phone) setPhone(data.phone);
    if (data.showPhone !== undefined) setShowPhone(data.showPhone);
    if (data.ext) setExt(data.ext);
    if (data.showLinkedin !== undefined) setShowLinkedin(data.showLinkedin);
    if (data.linkedin) setLinkedin(data.linkedin);
    if (data.showGreeting !== undefined) setShowGreeting(data.showGreeting);
    if (data.greeting) setGreeting(data.greeting);
    if (data.tab) setTab(data.tab);
    
    setNotification({
      message: tab === "he" ? "ההגדרות יובאו בהצלחה!" : "Settings imported successfully!",
      isVisible: true
    });
  }

  function handleReset() {
    setName("");
    setRole("");
    setEmail("");
    setPhone("");
    setShowPhone(false);
    setExt("");
    setShowLinkedin(false);
    setLinkedin("");
    setShowGreeting(false);
    setGreeting(GREETING_DEFAULTS.he);
    setTab("he");
    setErrors({});
  }

  const signatureHtml = buildSignatureHtml({
    tab,
    name,
    role,
    email,
    phone,
    showPhone,
    ext,
    showLinkedin,
    linkedin,
    showGreeting,
    greeting
  });

  return (
    <>
      {/* מצב תצוגה – צד ימין */}
      <div style={modeSelectStyle}>
        <select value={mode} onChange={handleModeChange}>
          <option value="dark">🌙 כהה</option>
          <option value="light">🌞 בהיר</option>
          <option value="system">🖥️ מערכת</option>
        </select>
      </div>

      <MainBox>
        {/* Header with instructions */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h1 style={{ color: "#1a237e", fontSize: "1.8em", margin: "0 0 8px 0", fontWeight: 700 }}>
            {tab === "he" ? "יוצר חתימת אימייל אינספיריה" : "Inspiria Email Signature Generator"}
          </h1>
          <p style={{ color: "#666", fontSize: "1em", margin: 0 }}>
            {tab === "he" 
              ? "מלא את הפרטים שלך וצור חתימת אימייל מקצועית" 
              : "Fill in your details and create a professional email signature"
            }
          </p>
        </div>

        <TabButtons activeTab={tab} onTabChange={setTab} />

        {/* Row 1 */}
        <div style={rowStyle}>
          <div style={colStyle}>
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
          <div style={colStyle}>
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
          <div style={colStyle}>
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

        {/* Row 2 */}
        <div style={rowStyle}>
          <div style={{ ...colStyle, flexBasis: 0, flexGrow: 1 }}>
            <ToggleField
              label="טלפון נייד"
              checked={showPhone}
              onChange={() => setShowPhone(!showPhone)}
              hintTitle="לא חובה. מלא אם תרצה להוסיף את הטלפון הנייד שלך"
            >
              {showPhone && (
                <TextField
                  id="phone"
                  value={phone}
                  onChange={e => {
                    setPhone(e.target.value);
                    clearError('phone');
                  }}
                  error={errors.phone}
                />
              )}
            </ToggleField>
          </div>
          <div style={{ ...colStyle, flexBasis: 0, flexGrow: 1 }}>
            <ToggleField
              label="לינקדין"
              checked={showLinkedin}
              onChange={() => setShowLinkedin(!showLinkedin)}
              showHint={true}
              hintTitle="לא חובה. קישור לפרופיל הלינקדאין האישי שלך"
            >
              {showLinkedin && (
                <TextField
                  id="linkedin"
                  value={linkedin}
                  onChange={e => {
                    setLinkedin(e.target.value);
                    clearError('linkedin');
                  }}
                  placeholder="קישור לפרופיל לינקדין"
                  error={errors.linkedin}
                />
              )}
            </ToggleField>
          </div>
        </div>

        {/* Row 3 */}
        <div style={rowStyle}>
          <div style={{ ...colStyle, maxWidth: 130 }}>
            <TextField
              id="ext"
              label="שלוחה"
              value={ext}
              onChange={e => setExt(e.target.value)}
            />
          </div>
          <div style={{ ...colStyle, flex: 2 }}>
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
           signatureHtml={signatureHtml}
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
