import React, { useState, useRef, useEffect } from "react";
import { TextField } from "./fields/TextField";
import { ToggleField } from "./fields/ToggleField";
import { TabButtons } from "./fields/TabButtons";
import { SignaturePreview } from "./SignaturePreview";
import { OutlookModal } from "./OutlookModal";
import { MainBox } from "../Layout/MainBox";
import { useColorMode } from "../../hooks/useColorMode";
import { useClipboardHtml } from "../../hooks/useClipboardHtml";
import { buildSignatureHtml } from "../../utils/buildSignatureHtml";
import { validateForm } from "../../utils/validation";
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
  const [tab, setTab] = useState("he");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showPhone, setShowPhone] = useState(false);
  const [ext, setExt] = useState("");
  const [showLinkedin, setShowLinkedin] = useState(false);
  const [linkedin, setLinkedin] = useState("");
  const [showGreeting, setShowGreeting] = useState(false);
  const [greeting, setGreeting] = useState(GREETING_DEFAULTS.he);
  const [showOutlook, setShowOutlook] = useState(false);
  const [errors, setErrors] = useState({});
  const [copyStatus, setCopyStatus] = useState("");

  const { mode, setMode } = useColorMode();
  const { copyHtml } = useClipboardHtml();
  const previewRef = useRef(null);

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

  function handleModeChange(e) {
    setMode(e.target.value);
  }

  function handleCopy() {
    if (!previewRef.current) return;
    
    const formData = {
      name, role, email, phone, showPhone, ext, showLinkedin, linkedin, showGreeting, greeting
    };
    
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
      </MainBox>

      <OutlookModal
        isOpen={showOutlook}
        onClose={() => setShowOutlook(false)}
        onCopy={handleCopy}
      />
    </>
  );
}
