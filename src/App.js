import React, { useState, useEffect } from "react";

const ICONS = {
  linkedin: "https://cdn-icons-png.flaticon.com/24/174/174857.png",
  phone: "https://i.postimg.cc/SN3tSSmB/phone.png",
  location: "https://i.postimg.cc/CMvQ2CXL/location.png",
  website: "https://i.postimg.cc/XqvDJXGb/internet.png",
  facebook: "https://i.postimg.cc/9FrnHRHP/facebook.png",
  linkedinCompany: "https://i.postimg.cc/gjBt6d86/linkedin.png",
  banner: "https://i.postimg.cc/L60S3Tyy/inspiria-signature.png",
  question: "https://cdn-icons-png.flaticon.com/512/25/25416.png"
};

const BG_LOGO = "https://i.postimg.cc/dVq5SbJX/Inspiria-Logo.png";

const LABELS = {
  he: {
    lang: "עברית",
    tab: "עברית",
    tabAlt: "English",
    name: "שם מלא",
    role: "תפקיד",
    email: "כתובת דוא\"ל",
    hasPhone: "להוסיף טלפון אישי?",
    phone: "טלפון אישי",
    ext: "מספר שלוחה",
    wantLinkedin: "הוספת לינקדאין?",
    linkedin: "קישור לינקדאין אישי",
    generate: "צור חתימה",
    copy: "העתק חתימה",
    preview: "תצוגה מקדימה",
    outlook: "הגדרת חתימה באאוטלוק",
    dark: "כהה",
    light: "בהיר",
    system: "מערכת",
    howTo: "איך להגדיר חתימה באאוטלוק?",
    popupTitle: "הוספת חתימה ב-Outlook",
    popupStep1: "1. העתיקו את החתימה בלחיצה על 'העתק חתימה'.",
    popupStep2: "2. פתחו את Outlook ובחרו קובץ > אפשרויות > דואר > חתימות.",
    popupStep3: "3. הוסיפו חתימה חדשה והדביקו את החתימה בחלון שנפתח.",
    popupStep4: "4. אשרו וסגרו – החתימה מוכנה!",
    openOutlook: "פתח את Outlook"
  },
  en: {
    lang: "English",
    tab: "English",
    tabAlt: "עברית",
    name: "Full Name",
    role: "Role/Position",
    email: "Email Address",
    hasPhone: "Add private phone?",
    phone: "Private Phone",
    ext: "Extension",
    wantLinkedin: "Add LinkedIn?",
    linkedin: "Personal LinkedIn Link",
    generate: "Generate Signature",
    copy: "Copy Signature",
    preview: "Preview",
    outlook: "Set Outlook Signature",
    dark: "Dark",
    light: "Light",
    system: "System",
    howTo: "How to set your signature in Outlook?",
    popupTitle: "Add Signature in Outlook",
    popupStep1: "1. Copy the signature using 'Copy Signature'.",
    popupStep2: "2. Open Outlook > File > Options > Mail > Signatures.",
    popupStep3: "3. Add a new signature and paste the HTML you copied.",
    popupStep4: "4. Save – and that's it!",
    openOutlook: "Open Outlook"
  },
};

function buildSignature({ lang, name, role, email, phone, ext, linkedin, wantLinkedin }) {
  const isHeb = lang === "he";
  return `
  <table dir="${isHeb ? "rtl" : "ltr"}" style="font-family:Arial,sans-serif; font-size:14px; color:#000; text-align:${isHeb ? "right" : "left"}; direction:${isHeb ? "rtl" : "ltr"}; line-height:1.6;" cellspacing="0" cellpadding="0">
    <tr>
      <td style="padding-bottom:8px;">
        <span style="font-size:17px; font-weight:bold; color:#1a237e;">${name || (isHeb ? "שם מלא" : "Full Name")}</span>
        ${wantLinkedin && linkedin ? `
          <a href="${linkedin}" target="_blank" style="${isHeb ? "margin-right" : "margin-left"}:6px; vertical-align:middle;">
            <img src="${ICONS.linkedin}" alt="${isHeb ? "LinkedIn אישי" : "Personal LinkedIn"}" style="height:18px; width:18px;">
          </a>
        ` : ""}
        <div style="color:#0044cc; font-size:15px;">${role || (isHeb ? "תפקיד" : "Role/Position")}</div>
        <a href="mailto:${email}" style="color:#000; text-decoration:none;">${email}</a>${phone ? ` | <a href="tel:${phone}" style="color:#000; text-decoration:none;">${phone}</a>` : ""}
      </td>
    </tr>
    <tr>
      <td style="padding-bottom:5px;">
        <span style="vertical-align:middle;">
          <img src="${ICONS.phone}" alt="${isHeb ? "טלפון משרד" : "Office Phone"}" style="height:16px; width:16px; vertical-align:middle; margin-${isHeb ? "left" : "right"}:4px;">
          03-3743555${ext ? `, ${isHeb ? "שלוחה" : "Ext."} ${ext}` : ""}
        </span>
      </td>
    </tr>
    <tr>
      <td style="padding-bottom:6px;">
        <a href="https://www.inspiria.co.il/" target="_blank">
          <img src="${ICONS.banner}" alt="Inspiria - אינספיריה" style="display:block;" width="210" height="auto">
        </a>
      </td>
    </tr>
    <tr>
      <td>
        <a style="margin-${isHeb ? "left" : "right"}:6px;" href="https://www.google.com/maps/search/?api=1&query=${isHeb ? "בנין+T,+Totseret+ha-Arets+St+3,+Petah+Tikva,+4951734" : "Building+T,+Totseret+ha-Arets+St+3,+Petah+Tikva,+4951734"}" target="_blank">
          <img style="height:32px; width:32px;" src="${ICONS.location}" alt="${isHeb ? "מיקום" : "Location"}" />
        </a>
        <a style="margin-${isHeb ? "left" : "right"}:6px;" href="https://www.inspiria.co.il/" target="_blank">
          <img style="height:32px; width:32px;" src="${ICONS.website}" alt="${isHeb ? "אתר אינטרנט" : "Website"}" />
        </a>
        <a style="margin-${isHeb ? "left" : "right"}:6px;" href="https://www.facebook.com/InspiriaExperts" target="_blank">
          <img style="height:32px; width:32px;" src="${ICONS.facebook}" alt="${isHeb ? "פייסבוק" : "Facebook"}" />
        </a>
        <a href="https://www.linkedin.com/company/inspiria-sap-b1-experts/" target="_blank">
          <img style="height:32px; width:32px;" src="${ICONS.linkedinCompany}" alt="LinkedIn - ${isHeb ? "אינספיריה" : "Inspiria"}" />
        </a>
      </td>
    </tr>
  </table>
  `.replace(/\s{2,}/g, " ");
}

// פופ-אפ הסבר לאאוטלוק
function Popup({ show, onClose, lang }) {
  const L = LABELS[lang];
  if (!show) return null;
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, zIndex: 1000, width: "100vw", height: "100vh",
      background: "rgba(20,20,30,0.38)", display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#23272e", color: "#f8faff", borderRadius: 20, boxShadow: "0 4px 44px #0007",
        padding: 36, minWidth: 330, maxWidth: 90 + "%",
        fontFamily: "Segoe UI, Arial, sans-serif", position: "relative"
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 20, background: "none", border: "none", color: "#fff",
          fontSize: 26, cursor: "pointer", lineHeight: 1
        }} title="סגור">×</button>
        <h2 style={{marginTop:0, fontWeight:700, color:"#2f7ef7", fontSize:"1.35em", marginBottom:18}}>{L.popupTitle}</h2>
        <ol style={{paddingInlineStart:22, marginBottom:15}}>
          <li>{L.popupStep1}</li>
          <li>{L.popupStep2}</li>
          <li>{L.popupStep3}</li>
          <li>{L.popupStep4}</li>
        </ol>
        <a href="outlook:" target="_blank" style={{
          display: "inline-block", marginTop: 6, background: "#2964e0", color: "#fff", padding: "9px 28px",
          borderRadius: 19, textDecoration: "none", fontWeight: 500, fontSize: "1.09em"
        }}>{L.openOutlook}</a>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("he");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [showPhone, setShowPhone] = useState(true);
  const [phone, setPhone] = useState("");
  const [ext, setExt] = useState("");
  const [wantLinkedin, setWantLinkedin] = useState(false);
  const [linkedin, setLinkedin] = useState("");
  const [signature, setSignature] = useState("");
  const [mode, setMode] = useState("system");
  const [showPopup, setShowPopup] = useState(false);

  const L = LABELS[lang];

  // DARK/LIGHT mode חכם
  useEffect(() => {
    const root = document.documentElement;
    const systemMode = window.matchMedia('(prefers-color-scheme: light)').matches ? "light" : "dark";
    let current = mode === "system" ? systemMode : mode;
    root.style.setProperty("--main-bg", current === "light" ? "#fff" : "#23272e");
    root.style.setProperty("--text-main", current === "light" ? "#181a1b" : "#f8faff");
    root.style.setProperty("--sig-bg", current === "light" ? "#f8faff" : "#181a1b");
    root.style.setProperty("--btn-bg", current === "light" ? "#2466dd" : "#2466dd");
    root.style.setProperty("--btn-txt", "#fff");
    document.body.style.background = current === "light" ? "#f5f7fa" : "#f1f3fa";
    document.body.style.background = current === "light" ? "#f5f7fa" : "#181a1b";
    document.body.style.color = "inherit";
  }, [mode]);

  function handleGenerate(e) {
    e.preventDefault();
    setSignature(
      buildSignature({
        lang,
        name,
        role,
        email,
        phone: showPhone && phone ? phone : "",
        ext,
        linkedin,
        wantLinkedin,
      })
    );
  }

  function handleCopy() {
    if (!signature) return;
    const blob = new Blob([signature], { type: "text/html" });
    const data = [new ClipboardItem({ "text/html": blob })];
    navigator.clipboard.write(data).then(() => {
      alert(lang === "he" ? "החתימה הועתקה!" : "Signature copied!");
    });
  }

  // טאבים: עברית/אנגלית
  const Tab = ({ value, children }) => (
    <button
      onClick={() => setLang(value)}
      className="tab-btn"
      style={{
        background: lang === value ? "#fff2" : "transparent",
        color: lang === value ? "#2265b9" : "#7e93af",
        border: "none",
        fontWeight: lang === value ? 700 : 500,
        fontSize: "1.08em",
        padding: "8px 36px",
        borderRadius: "18px 18px 0 0",
        cursor: "pointer",
        outline: "none",
        transition: "all 0.15s"
      }}>
      {children}
    </button>
  );

  // עיצוב רקע עם לוגו אינספיריה
  const bgStyle = {
    minHeight: "100vh",
    background: `url(${BG_LOGO}) no-repeat fixed center 70px/260px, var(--main-bg)`,
    transition: "background 0.18s"
  };

  return (
    <div style={bgStyle}>
      <Popup show={showPopup} onClose={() => setShowPopup(false)} lang={lang} />
      <div className="container"
        style={{
          margin: "48px auto 0 auto", maxWidth: 700, background: "var(--main-bg)", borderRadius: 22,
          boxShadow: "0 8px 48px #0005", padding: "38px 38px 28px 38px",
          color: "var(--text-main)", position: "relative", minHeight: 380,
          fontFamily: "Segoe UI, Arial, sans-serif"
        }}>
        {/* Mode select */}
        <div style={{ position: "absolute", top: 16, right: 20, zIndex: 10 }}>
          <select
            className="mode-select"
            style={{
              padding: "8px 18px 8px 32px", borderRadius: 22, background: "#23262f", color: "#8bb8f9", fontSize: "1rem", border: "1.5px solid #394355"
            }}
            value={mode}
            onChange={e => setMode(e.target.value)}
          >
            <option value="dark">🌙 {L.dark}</option>
            <option value="light">🌞 {L.light}</option>
            <option value="system">🖥️ {L.system}</option>
          </select>
        </div>
        {/* Header - לוגו וכותרת */}
        <div style={{ display: "flex", alignItems: "center", gap: 17, marginBottom: 4 }}>
          <img src={BG_LOGO} alt="Inspiria Logo" style={{ width: 58, height: 58, borderRadius: 14, boxShadow: "0 2px 14px #1c62" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span style={{ fontSize: "1.39rem", fontWeight: 700, color: "#2471ea", letterSpacing: ".01em", lineHeight: 1.2 }}>
              {lang === "he" ? "מחולל חתימות אינספיריה" : "Inspiria Signature Generator"}
            </span>
            <span style={{
              fontSize: "1.06rem", color: "#60759e",
              fontWeight: 400, marginTop: 0, marginBottom: 1,
              textAlign: lang === "he" ? "right" : "left"
            }}>
              {lang === "he" ? "מייצרים חתימות מייל מעוצבות לכל עובדי אינספיריה" : "Generate modern mail signatures for Inspiria employees"}
            </span>
          </div>
        </div>
        {/* Language Tabs */}
        <div style={{ display: "flex", gap: 0, marginBottom: 14, marginTop: 8, justifyContent: "flex-start" }}>
          <Tab value="he">{LABELS.he.tab}</Tab>
          <Tab value="en">{LABELS.en.tab}</Tab>
        </div>
        {/* Form */}
        <form onSubmit={handleGenerate} style={{ width: "100%", marginTop: 4 }}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 8 }}>
            <div style={{ flex: "1 1 190px" }}>
              <label style={labelStyle(lang)}>{L.name}:</label>
              <input style={inputStyle(lang)} value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div style={{ flex: "1 1 190px" }}>
              <label style={labelStyle(lang)}>{L.role}:</label>
              <input style={inputStyle(lang)} value={role} onChange={e => setRole(e.target.value)} required />
            </div>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 8 }}>
            <div style={{ flex: "1 1 190px" }}>
              <label style={labelStyle(lang)}>{L.email}:</label>
              <input style={inputStyle(lang)} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div style={{ flex: "1 1 150px", display: "flex", alignItems: "center", gap: 6 }}>
              <input type="checkbox" checked={showPhone} onChange={() => setShowPhone(!showPhone)} style={{ margin: 0 }} id="showphone" />
              <label htmlFor="showphone" style={labelStyle(lang)}>{L.hasPhone}</label>
              {showPhone && (
                <input style={{ ...inputStyle(lang), width: 102 }} value={phone} onChange={e => setPhone(e.target.value)} placeholder="05x-xxxxxxx" />
              )}
            </div>
            <div style={{ flex: "1 1 110px" }}>
              <label style={labelStyle(lang)}>{L.ext}:</label>
              <input style={inputStyle(lang)} value={ext} onChange={e => setExt(e.target.value)} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <input type="checkbox" checked={wantLinkedin} onChange={() => setWantLinkedin(!wantLinkedin)} id="wantLinkedin" />
            <label htmlFor="wantLinkedin" style={labelStyle(lang)}>{L.wantLinkedin}</label>
            {wantLinkedin && (
              <>
                <input style={{ ...inputStyle(lang), width: 235 }} value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/..." />
                <img src={ICONS.linkedin} alt="LinkedIn" style={{ width: 18, height: 18, marginInlineStart: 4 }} />
              </>
            )}
          </div>
          <button type="submit" style={{
            background: "var(--btn-bg)", color: "var(--btn-txt)", padding: "13px 34px",
            borderRadius: 22, border: "none", fontSize: "1.16em", fontWeight: 600,
            marginTop: 2, cursor: "pointer", boxShadow: "0 2px 6px #2461", letterSpacing: "0.02em"
          }}>
            {L.generate}
          </button>
        </form>
        {signature && (
          <div style={{
            marginTop: 26, background: "var(--sig-bg)", borderRadius: 17, padding: "18px 16px 16px 16px", boxShadow: "0 2px 12px #0002"
          }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5
            }}>
              <span style={{ fontWeight: 700, fontSize: "1.08em", color: "#2265b9" }}>{L.preview}:</span>
              <div style={{ display: "flex", gap: 9 }}>
                <button onClick={handleCopy} style={{
                  background: "#2964e0", color: "#fff", padding: "8px 19px",
                  borderRadius: 14, fontSize: "1em", border: "none", cursor: "pointer", fontWeight: 500
                }}>{L.copy}</button>
                <button onClick={e => { e.preventDefault(); setShowPopup(true); }} style={{
                  background: "#3f4b5a", color: "#fff", padding: "8px 17px", borderRadius: 14, fontSize: "1em",
                  border: "none", cursor: "pointer", fontWeight: 500
                }}>{L.outlook}</button>
              </div>
            </div>
            <div className="sig-html" style={{
              border: "1px solid #b0c5ee55", borderRadius: 8, background: "#fff",
              color: "#222", padding: "13px 13px 10px 13px", marginBottom: 8, overflowX: "auto"
            }} dangerouslySetInnerHTML={{ __html: signature }} />
            <textarea
              value={signature}
              readOnly
              style={{
                width: "100%", minHeight: 50, maxHeight: 100, fontSize: "0.98em", borderRadius: 9,
                border: "1px solid #aac4ef55", padding: 8, background: "#f8faff", marginTop: 0
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// עיצוב ללייבל/אינפוט:
function labelStyle(lang) {
  return {
    fontWeight: 500,
    fontSize: "1em",
    marginLeft: lang === "he" ? 0 : 5,
    marginRight: lang === "he" ? 5 : 0,
    color: "var(--text-main)",
    marginBottom: 2
  };
}
function inputStyle(lang) {
  return {
    border: "1.5px solid #aac4ef55",
    borderRadius: 8,
    padding: "8px 10px",
    fontSize: "1.04em",
    fontFamily: "inherit",
    marginLeft: lang === "he" ? 0 : 5,
    marginRight: lang === "he" ? 5 : 0,
    background: "#f7f8fd",
    minWidth: 0,
    color: "#242a38",
    marginBottom: 2
  };
}
