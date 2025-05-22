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

const LABELS = {
  he: {
    lang: "עברית",
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
    outlook: "פתח אאוטלוק",
    dark: "כהה",
    light: "בהיר",
    system: "מערכת"
  },
  en: {
    lang: "English",
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
    outlook: "Open Outlook",
    dark: "Dark",
    light: "Light",
    system: "System"
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

function buildOutlookUrl({ email, subject, body }) {
  // פותח אאוטלוק עם טיוטה חדשה
  let mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return mailto;
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

  const L = LABELS[lang];

  // שינוי דארק/לייט מוד – ברירת מחדל מערכת
  useEffect(() => {
    const sysMode = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    let modeClass = mode === 'system' ? sysMode : mode;
    document.body.classList.toggle('light-mode', modeClass === 'light');
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

  function openOutlook() {
    const subject = lang === "he" ? "הגדרת חתימה באאוטלוק" : "Set your email signature";
    const body = lang === "he"
      ? `יש להדביק את החתימה הזו בשדה החתימה באאוטלוק.\n\n${signature.replace(/<[^>]+>/g, '')}`
      : `Please paste this signature into Outlook signature field.\n\n${signature.replace(/<[^>]+>/g, '')}`;
    window.open(buildOutlookUrl({ email, subject, body }), "_blank");
  }

  return (
    <div className="container"
      style={{
        margin: "48px auto 0 auto", maxWidth: 830, background: "var(--main-bg,#23272e)", borderRadius: 22, boxShadow: "0 8px 48px #0005", padding: "40px 48px 36px 48px",
        color: "inherit", position: "relative"
      }}>
      {/* Mode select */}
      <div style={{ position: "absolute", top: 16, right: 24, zIndex: 10 }}>
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
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 22, marginBottom: 18 }}>
        <img src="https://i.postimg.cc/HnR9zwHs/Official-118px.jpg" alt="Niv Schendel" style={{ width: 72, height: 72, borderRadius: "50%", border: "2.5px solid #8bb8f9", background: "#fff" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: "1.23rem", fontWeight: "bold", color: "#8bb8f9" }}>Inspiria | Signature Generator</span>
          </div>
          <div style={{ fontSize: "1.08rem", color: "#b5b5c7", marginTop: 2 }}>
            {lang === "he" ? "מחולל חתימות אינספיריה" : "Inspiria signature generator"}
          </div>
        </div>
      </div>
      {/* טופס */}
      <form onSubmit={handleGenerate} style={{ width: "100%", marginTop: 4 }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
          <label>
            <input type="radio" checked={lang === "he"} onChange={() => setLang("he")} /> עברית
          </label>
          <label>
            <input type="radio" checked={lang === "en"} onChange={() => setLang("en")} /> English
          </label>
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 200px" }}>
            <label style={{ display: "block", marginBottom: 3 }}>{L.name}:</label>
            <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div style={{ flex: "1 1 200px" }}>
            <label style={{ display: "block", marginBottom: 3 }}>{L.role}:</label>
            <input style={inputStyle} value={role} onChange={e => setRole(e.target.value)} required />
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 10 }}>
          <div style={{ flex: "1 1 200px" }}>
            <label style={{ display: "block", marginBottom: 3 }}>{L.email}:</label>
            <input style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div style={{ flex: "1 1 200px", display: "flex", alignItems: "center", gap: 7 }}>
            <input type="checkbox" checked={showPhone} onChange={() => setShowPhone(!showPhone)} />
            <label>{L.hasPhone}</label>
            {showPhone &&
              <input style={{ ...inputStyle, width: 120 }} value={phone} onChange={e => setPhone(e.target.value)} />}
          </div>
          <div style={{ flex: "1 1 120px" }}>
            <label style={{ display: "block", marginBottom: 3 }}>{L.ext}:</label>
            <input style={inputStyle} value={ext} onChange={e => setExt(e.target.value)} />
          </div>
        </div>
        <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 7 }}>
          <input type="checkbox" checked={wantLinkedin} onChange={() => setWantLinkedin(!wantLinkedin)} id="chkLinkedin" />
          <label htmlFor="chkLinkedin">{L.wantLinkedin}</label>
          <span title={lang === "he" ? "אם תסמן, קישור ואייקון לינקדאין יוצגו בחתימה" : "If checked, LinkedIn link and icon will show in your signature"}>
            <img src={ICONS.question} alt="?" style={{ width: 18, height: 18, opacity: 0.6, verticalAlign: "middle", marginLeft: 2 }} />
          </span>
          {wantLinkedin &&
            <input style={{ ...inputStyle, width: 280 }} value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/your-link" />}
        </div>
        <button type="submit" style={buttonStyle}>{L.generate}</button>
      </form>
      {signature &&
        <div style={{ marginTop: 36 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontWeight: 700, fontSize: "1.14rem" }}>{L.preview}:</span>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={handleCopy} style={smallButtonStyle}>{L.copy}</button>
              <button onClick={openOutlook} style={smallButtonStyle}>{L.outlook}</button>
            </div>
          </div>
          <div className="sig-preview" style={{
            background: "var(--sig-bg,#181a1b)", borderRadius: 15, padding: 20, border: "1.5px solid #303546",
            boxShadow: "0 2px 16px #0013"
          }}>
            <div dangerouslySetInnerHTML={{ __html: signature }} />
          </div>
        </div>
      }
    </div>
  );
}

const inputStyle = {
  border: "1.5px solid #394355",
  borderRadius: 13,
  padding: "9px 16px",
  background: "#1e2227",
  color: "#eaf1fb",
  fontSize: "1.08em",
  outline: "none",
  marginBottom: 6,
  width: "100%"
};
const buttonStyle = {
  marginTop: 16,
  padding: "13px 38px",
  borderRadius: 22,
  background: "#2466dd",
  color: "#fff",
  border: "none",
  fontWeight: 600,
  fontSize: "1.13em",
  cursor: "pointer",
  boxShadow: "0 1.5px 8px #2463",
  transition: "background 0.18s"
};
const smallButtonStyle = {
  ...buttonStyle,
  padding: "8px 18px",
  fontSize: "0.98em",
  marginTop: 0,
};

