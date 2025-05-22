import React, { useState } from "react";

// ICONS
const ICONS = {
  linkedin: "https://cdn-icons-png.flaticon.com/24/174/174857.png",
  phone: "https://i.postimg.cc/SN3tSSmB/phone.png",
  location: "https://i.postimg.cc/CMvQ2CXL/location.png",
  website: "https://i.postimg.cc/XqvDJXGb/internet.png",
  facebook: "https://i.postimg.cc/9FrnHRHP/facebook.png",
  linkedinCompany: "https://i.postimg.cc/gjBt6d86/linkedin.png",
  banner: "https://i.postimg.cc/L60S3Tyy/inspiria-signature.png",
  logo: "https://i.postimg.cc/dVq5SbJX/Inspiria-Logo.png",
};

const LABELS = {
  he: {
    lang: "עברית",
    title: "מחולל חתימות אינספיריה",
    subtitle: "מייצרים חתימות מייל מעוצבות לכל עובדי אינספיריה",
    name: "שם מלא",
    role: "תפקיד",
    email: "כתובת דוא\"ל",
    hasPhone: "להוסיף טלפון אישי?",
    phone: "טלפון אישי",
    ext: "מספר שלוחה",
    wantLinkedin: "הוספת לינקדאין?",
    linkedin: "קישור אישי ללינקדאין",
    generate: "צור חתימה",
    copy: "העתק חתימה",
    preview: "תצוגה מקדימה",
    outlook: "הוספת החתימה לאאוטלוק",
    close: "סגור",
    howTo: "להוספת החתימה לאאוטלוק:\n1. העתק את החתימה\n2. עבור לאאוטלוק > קובץ > אפשרויות > דואר > חתימות\n3. הדבק וערוך במידת הצורך",
    signatureTab: "חתימה בעברית",
    signatureTabEN: "חתימה באנגלית",
    extensionPH: "שלוחה (לא חובה)",
    system: "מערכת",
    light: "בהיר",
    dark: "כהה"
  },
  en: {
    lang: "English",
    title: "Inspiria Signature Generator",
    subtitle: "Create branded email signatures for all Inspiria employees",
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
    outlook: "Add Signature to Outlook",
    close: "Close",
    howTo: "To add signature in Outlook:\n1. Copy the signature\n2. Go to Outlook > File > Options > Mail > Signatures\n3. Paste and edit if needed",
    signatureTab: "Hebrew Signature",
    signatureTabEN: "English Signature",
    extensionPH: "Extension (optional)",
    system: "System",
    light: "Light",
    dark: "Dark"
  }
};

// Build signature HTML
function buildSignature({ lang, name, role, email, phone, ext, linkedin, signatureLang }) {
  const isHeb = signatureLang === "he";
  return `
<table dir="${isHeb ? "rtl" : "ltr"}" style="font-family:Arial,sans-serif;font-size:14px;color:#000;text-align:${isHeb ? "right" : "left"};direction:${isHeb ? "rtl" : "ltr"};line-height:1.6;" cellspacing="0" cellpadding="0">
  <tr>
    <td style="padding-bottom:8px;">
      <span style="font-size:17px;font-weight:bold;color:#1a237e;">${name || (isHeb ? "שם מלא" : "Full Name")}</span>
      ${linkedin ? `
        <a href="${linkedin}" target="_blank" style="${isHeb ? "margin-right" : "margin-left"}:6px;vertical-align:middle;">
          <img src="${ICONS.linkedin}" alt="LinkedIn" style="height:18px;width:18px;">
        </a>
      ` : ""}
      <div style="color:#0044cc;font-size:15px;">${role || (isHeb ? "תפקיד" : "Role/Position")}</div>
      <a href="mailto:${email}" style="color:#000;text-decoration:none;">${email}</a>
      ${phone ? ` | <a href="tel:${phone}" style="color:#000;text-decoration:none;">${phone}</a>` : ""}
    </td>
  </tr>
  <tr>
    <td style="padding-bottom:5px;">
      <span style="vertical-align:middle;">
        <img src="${ICONS.phone}" alt="${isHeb ? "טלפון משרד" : "Office Phone"}" style="height:16px;width:16px;vertical-align:middle;margin-${isHeb ? "left" : "right"}:4px;">
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
        <img style="height:32px;width:32px;" src="${ICONS.location}" alt="Location"/>
      </a>
      <a style="margin-${isHeb ? "left" : "right"}:6px;" href="https://www.inspiria.co.il/" target="_blank">
        <img style="height:32px;width:32px;" src="${ICONS.website}" alt="Website"/>
      </a>
      <a style="margin-${isHeb ? "left" : "right"}:6px;" href="https://www.facebook.com/InspiriaExperts" target="_blank">
        <img style="height:32px;width:32px;" src="${ICONS.facebook}" alt="Facebook"/>
      </a>
      <a href="https://www.linkedin.com/company/inspiria-sap-b1-experts/" target="_blank">
        <img style="height:32px;width:32px;" src="${ICONS.linkedinCompany}" alt="LinkedIn"/>
      </a>
    </td>
  </tr>
</table>
`.replace(/\s{2,}/g, " ");
}

export default function SignatureApp() {
  // State
  const [lang, setLang] = useState("he");
  const [signatureLang, setSignatureLang] = useState("he");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [showPhone, setShowPhone] = useState(false);
  const [phone, setPhone] = useState("");
  const [ext, setExt] = useState("");
  const [wantLinkedin, setWantLinkedin] = useState(false);
  const [linkedin, setLinkedin] = useState("");
  const [signature, setSignature] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const L = LABELS[lang];

  // Generate signature
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
        linkedin: wantLinkedin ? linkedin : "",
        signatureLang
      })
    );
  }

  // Copy to clipboard
  function handleCopy() {
    if (!signature) return;
    const el = document.createElement("textarea");
    el.value = signature;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    alert(lang === "he" ? "החתימה הועתקה!" : "Signature copied!");
  }

  // Main UI
  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#232730 url('https://i.postimg.cc/dVq5SbJX/Inspiria-Logo.png') no-repeat 50vw 12vh",
        backgroundSize: "330px",
        paddingTop: 0,
        fontFamily: "Segoe UI, Arial, sans-serif"
      }}
    >
      <div style={{
        maxWidth: 1000, minWidth: 420, margin: "46px auto 0 auto", borderRadius: 28,
        background: "#23272eF2", boxShadow: "0 8px 48px #0005", padding: "46px 50px 38px 50px", position: "relative"
      }}>
        {/* לוגו ושורת כותרת */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 18, gap: 17 }}>
          <img src={ICONS.logo} alt="Inspiria Logo" style={{ height: 64, width: "auto", marginInlineEnd: 16 }} />
          <div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#256be9", marginBottom: 0 }}>
              {L.title}
            </div>
            <div style={{
              fontSize: 15.6, fontWeight: 400, color: "#e4e7ef",
              letterSpacing: ".03em", marginTop: 2, marginBottom: 0
            }}>
              {L.subtitle}
            </div>
          </div>
        </div>
        {/* טאבס של חתימה */}
        <div style={{
          display: "flex", gap: 3, marginBottom: 23, marginTop: 3
        }}>
          <button
            onClick={() => setSignatureLang("he")}
            style={{
              background: signatureLang === "he" ? "#2964e0" : "#1e2227",
              color: signatureLang === "he" ? "#fff" : "#8bb8f9",
              border: "none", borderRadius: "13px 13px 0 0",
              padding: "11px 42px", fontSize: "1.15em", fontWeight: 500, cursor: "pointer"
            }}
          >
            {L.signatureTab}
          </button>
          <button
            onClick={() => setSignatureLang("en")}
            style={{
              background: signatureLang === "en" ? "#2964e0" : "#1e2227",
              color: signatureLang === "en" ? "#fff" : "#8bb8f9",
              border: "none", borderRadius: "13px 13px 0 0",
              padding: "11px 42px", fontSize: "1.15em", fontWeight: 500, cursor: "pointer"
            }}
          >
            {L.signatureTabEN}
          </button>
        </div>
        {/* טופס פרטים */}
        <form onSubmit={handleGenerate} style={{
          display: "flex", flexDirection: "column", gap: 0, alignItems: "stretch"
        }}>
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 19, marginBottom: 12
          }}>
            <div style={{ flex: "1 1 240px", minWidth: 160 }}>
              <label style={labelStyle("he")}>{L.name}:</label>
              <input style={inputStyle("he")} value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div style={{ flex: "1 1 240px", minWidth: 160 }}>
              <label style={labelStyle("he")}>{L.role}:</label>
              <input style={inputStyle("he")} value={role} onChange={e => setRole(e.target.value)} required />
            </div>
            <div style={{ flex: "1 1 180px", minWidth: 130 }}>
              <label style={labelStyle("he")}>{L.email}:</label>
              <input style={inputStyle("he")} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div style={{ flex: "1 1 125px", minWidth: 90, display: "flex", alignItems: "center", gap: 6 }}>
              <input type="checkbox" checked={showPhone} onChange={() => setShowPhone(!showPhone)} style={{ margin: 0 }} id="showphone" />
              <label htmlFor="showphone" style={labelStyle("he")}>{L.hasPhone}</label>
              {showPhone && (
                <input style={{ ...inputStyle("he"), width: 102 }} value={phone} onChange={e => setPhone(e.target.value)} placeholder="05x-xxxxxxx" />
              )}
            </div>
            <div style={{ flex: "1 1 110px", minWidth: 80 }}>
              <label style={labelStyle("he")}>{L.ext}:</label>
              <input style={inputStyle("he")} value={ext} onChange={e => setExt(e.target.value)} placeholder={L.extensionPH} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
            <input type="checkbox" checked={wantLinkedin} onChange={() => setWantLinkedin(!wantLinkedin)} id="wantLinkedin" />
            <label htmlFor="wantLinkedin" style={labelStyle("he")}>{L.wantLinkedin}</label>
            {wantLinkedin && (
              <>
                <input style={{ ...inputStyle("he"), width: 235 }} value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/..." />
                <img src={ICONS.linkedin} alt="LinkedIn" style={{ width: 18, height: 18, marginInlineStart: 4 }} />
              </>
            )}
          </div>
          <button type="submit" style={{
            background: "#2964e0", color: "#fff", padding: "14px 36px",
            borderRadius: 22, border: "none", fontSize: "1.19em", fontWeight: 600,
            marginTop: 2, cursor: "pointer", boxShadow: "0 2px 6px #2461", letterSpacing: "0.02em", alignSelf: "flex-start"
          }}>
            {L.generate}
          </button>
        </form>
        {/* תצוגת חתימה, כפתור העתקה, פופאפ אאוטלוק */}
        {signature && (
          <div style={{
            marginTop: 26, background: "#282e39", borderRadius: 17, padding: "20px 18px 18px 18px", boxShadow: "0 2px 12px #0002"
          }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6
            }}>
              <span style={{ fontWeight: 700, fontSize: "1.08em", color: "#2265b9" }}>{L.preview}:</span>
              <div style={{ display: "flex", gap: 11 }}>
                <button onClick={handleCopy} style={{
                  background: "#2964e0", color: "#fff", padding: "8px 21px",
                  borderRadius: 14, fontSize: "1em", border: "none", cursor: "pointer", fontWeight: 500
                }}>{L.copy}</button>
                <button onClick={e => { e.preventDefault(); setShowPopup(true); }} style={{
                  background: "#3f4b5a", color: "#fff", padding: "8px 17px", borderRadius: 14, fontSize: "1em",
                  border: "none", cursor: "pointer", fontWeight: 500
                }}>{L.outlook}</button>
              </div>
            </div>
            <div className="sig-html" style={{
              border: "1.5px solid #b0c5ee55", borderRadius: 8, background: "#fff",
              color: "#222", padding: "15px 14px 12px 14px", marginBottom: 8, overflowX: "auto", direction: signatureLang === "he" ? "rtl" : "ltr"
            }} dangerouslySetInnerHTML={{ __html: signature }} />
          </div>
        )}
        {/* פופאפ אאוטלוק */}
        {showPopup && (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            background: "#0009", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100
          }}>
            <div style={{
              background: "#fff", color: "#223", borderRadius: 22, padding: "32px 36px", boxShadow: "0 3px 14px #2327",
              minWidth: 320, maxWidth: "90vw", textAlign: "center", fontSize: "1.15em"
            }}>
              <div style={{ fontWeight: 700, fontSize: "1.08em", marginBottom: 15 }}>{L.outlook}</div>
              <div style={{ whiteSpace: "pre-line", marginBottom: 18, color: "#222" }}>{L.howTo}</div>
              <a href="outlook:///" target="_blank" rel="noopener noreferrer" style={{
                color: "#2964e0", fontWeight: 700, fontSize: "1.13em"
              }}>
                מעבר לאאוטלוק
              </a>
              <br /><br />
              <button onClick={() => setShowPopup(false)} style={{
                background: "#2964e0", color: "#fff", padding: "8px 23px",
                borderRadius: 14, fontSize: "1em", border: "none", cursor: "pointer", fontWeight: 500
              }}>{L.close}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Input style helper
function inputStyle() {
  return {
    fontSize: "1.11em",
    padding: "9px 12px",
    borderRadius: 9,
    border: "1.2px solid #b0c5ee30",
    background: "#292e37",
    color: "#fff",
    outline: "none",
    marginTop: 2,
    marginBottom: 2,
    width: "100%",
    boxSizing: "border-box"
  };
}

// Label style helper
function labelStyle() {
  return {
    color: "#b4caee",
    fontWeight: 500,
    fontSize: "1.07em",
    marginInlineEnd: 6
  };
}
