import React, { useState, useEffect } from "react";

// ICONS
const ICONS = {
  linkedin: "https://cdn-icons-png.flaticon.com/24/174/174857.png",
  outlook: "https://cdn-icons-png.flaticon.com/128/732/732223.png",
  banner: "https://i.postimg.cc/L60S3Tyy/inspiria-signature.png",
  logo: "https://i.postimg.cc/dVq5SbJX/Inspiria-Logo.png",
};

const LABELS = {
  he: {
    name: "שם מלא",
    role: "תפקיד",
    email: "דוא\"ל",
    phone: "טלפון אישי",
    ext: "שלוחה",
    hasPhone: "הוסף טלפון אישי",
    hasLinkedin: "הוסף לינקדאין אישי",
    linkedin: "קישור לינקדאין",
    greeting: "הוסף ברכה אישית",
    greeting_placeholder: "בברכה,\nשם העובד",
    generate: "צור חתימה",
    copy: "העתק חתימה",
    preview: "תצוגה מקדימה",
    workingHours: "שעות פעילות: א'-ה' 09:00–17:30",
    signature_he: "חתימה בעברית",
    signature_en: "חתימה באנגלית",
    outlook: "הוראות לאאוטלוק",
    toOutlook: "פתח אאוטלוק",
    close: "סגור",
    linkedin_placeholder: "לינק (למשל: https://linkedin.com/in/you)",
    defaultGreeting: "בברכה,"
  },
  en: {
    name: "Full Name",
    role: "Role",
    email: "Email",
    phone: "Private Phone",
    ext: "Extension",
    hasPhone: "Add Private Phone",
    hasLinkedin: "Add LinkedIn",
    linkedin: "LinkedIn Link",
    greeting: "Add Greeting",
    greeting_placeholder: "Best regards,\nYour Name",
    generate: "Generate Signature",
    copy: "Copy Signature",
    preview: "Preview",
    workingHours: "Working hours: Sun-Thu 09:00–17:30",
    signature_he: "Hebrew Signature",
    signature_en: "English Signature",
    outlook: "Outlook Instructions",
    toOutlook: "Open Outlook",
    close: "Close",
    linkedin_placeholder: "Link (e.g.: https://linkedin.com/in/you)",
    defaultGreeting: "Best regards,"
  }
};

// ---- Theme Handler ----
function setColorMode(mode) {
  if (mode === "system") {
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    document.body.className = prefersLight ? "light-mode" : "dark-mode";
  } else {
    document.body.className = mode === "light" ? "light-mode" : "dark-mode";
  }
}

export default function App() {
  // --- States ---
  const [lang, setLang] = useState("he");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [showPhone, setShowPhone] = useState(false);
  const [phone, setPhone] = useState("");
  const [ext, setExt] = useState("");
  const [showLinkedin, setShowLinkedin] = useState(false);
  const [linkedin, setLinkedin] = useState("");
  const [showGreeting, setShowGreeting] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [signature, setSignature] = useState("");
  const [tab, setTab] = useState("he");
  const [showPopup, setShowPopup] = useState(false);
  const [mode, setMode] = useState(localStorage.getItem("color-mode") || "system");

  // --- Theme effect ---
  useEffect(() => {
    setColorMode(mode);
    localStorage.setItem("color-mode", mode);
  }, [mode]);

  // --- System color scheme change ---
  useEffect(() => {
    function handleSystemChange(e) {
      if (mode === "system") setColorMode("system");
    }
    window.matchMedia('(prefers-color-scheme: light)').addEventListener("change", handleSystemChange);
    return () => window.matchMedia('(prefers-color-scheme: light)').removeEventListener("change", handleSystemChange);
  }, [mode]);

  // --- Labels ---
  const L = LABELS[lang];

function buildSignature() {
  // אם אנגלית – HTML לפי הקובץ האנגלי, אחרת – לפי העברי
  const isHeb = tab === "he";
  let html = "";
  if (isHeb) {
    html = `
<table dir="rtl" style="font-family: Arial,sans-serif; font-size: 14px; color: #000; text-align: right; direction: rtl; line-height: 1.6;" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="padding-bottom: 8px;">
<span style="font-size: 17px; font-weight: bold; color: #1a237e;">${name || "שם מלא"}</span>
${showLinkedin && linkedin ? `<a style="margin-right: 6px; vertical-align: middle;" href="${linkedin}" target="_blank">
  <img style="height: 18px; width: 18px;" src="https://cdn-icons-png.flaticon.com/24/174/174857.png" alt="LinkedIn אישי" />
</a>` : ""}
<div style="color: #0044cc; font-size: 15px;">${role || "תפקיד"}</div>
<a style="color: #000; text-decoration: none;" href="mailto:${email}">${email}</a>${showPhone && phone ? ` | <a style="color: #000; text-decoration: none;" href="tel:${phone}">${phone}</a>` : ""}
</td>
</tr>
<tr>
<td style="padding-bottom: 5px;">
<span style="vertical-align: middle;"> <img style="height: 16px; width: 16px; vertical-align: middle; margin-left: 4px;" src="https://i.postimg.cc/SN3tSSmB/phone.png" alt="טלפון משרד" /> 03-3743555 </span>
</td>
</tr>
<tr>
<td style="color:#888; font-size:12px; padding-bottom: 2px;">
<b>שעות פעילות:</b> ימים א'-ה' 09:00–17:30
</td>
</tr>
<tr>
<td style="padding-bottom: 6px;">
<a href="https://www.inspiria.co.il/" target="_blank">
<img style="display: block;" src="https://i.postimg.cc/L60S3Tyy/inspiria-signature.png" alt="Inspiria - אינספיריה" width="210" height="auto" />
</a>
</td>
</tr>
<tr>
<td>
<a style="margin-left: 6px;" href="https://www.google.com/maps/search/?api=1&amp;query=בנין+T,+Totseret+ha-Arets+St+3,+Petah+Tikva,+4951734" target="_blank">
<img style="height: 32px; width: 32px;" src="https://i.postimg.cc/CMvQ2CXL/location.png" alt="מיקום" /></a>
<a style="margin-left: 6px;" href="https://www.inspiria.co.il/" target="_blank">
<img style="height: 32px; width: 32px;" src="https://i.postimg.cc/XqvDJXGb/internet.png" alt="אתר אינטרנט" /></a>
<a style="margin-left: 6px;" href="https://www.facebook.com/InspiriaExperts" target="_blank">
<img style="height: 32px; width: 32px;" src="https://i.postimg.cc/9FrnHRHP/facebook.png" alt="פייסבוק" /></a>
<a href="https://www.linkedin.com/company/inspiria-sap-b1-experts/" target="_blank">
<img style="height: 32px; width: 32px;" src="https://i.postimg.cc/gjBt6d86/linkedin.png" alt="LinkedIn - אינספיריה" /></a>
</td>
</tr>
</tbody>
</table>
${showGreeting && greeting ? `<div style="margin-top:6px; color:#1a237e; font-size:15px;">${greeting}</div>` : ""}
    `;
  } else {
    html = `
<table dir="ltr" style="font-family: Arial,sans-serif; font-size: 14px; color: #000; text-align: left; direction: ltr; line-height: 1.6;" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="padding-bottom: 8px;">
<span style="font-size: 17px; font-weight: bold; color: #1a237e;">${name || "Full Name"}</span>
${showLinkedin && linkedin ? `<a style="margin-left: 6px; vertical-align: middle;" href="${linkedin}" target="_blank">
  <img style="height: 18px; width: 18px;" src="https://cdn-icons-png.flaticon.com/24/174/174857.png" alt="Personal LinkedIn" />
</a>` : ""}
<div style="color: #0044cc; font-size: 15px;">${role || "Role"}</div>
<a style="color: #000; text-decoration: none;" href="mailto:${email}">${email}</a>${showPhone && phone ? ` | <a style="color: #000; text-decoration: none;" href="tel:${phone}">${phone}</a>` : ""}
</td>
</tr>
<tr>
<td style="padding-bottom: 5px;">
<span style="vertical-align: middle;"> <img style="height: 16px; width: 16px; vertical-align: middle; margin-right: 4px;" src="https://i.postimg.cc/SN3tSSmB/phone.png" alt="Office Phone" /> 03-3743555 </span>
</td>
</tr>
<tr>
<td style="color:#888; font-size:12px; padding-bottom: 2px;">
<b>Working hours:</b> Sun-Thu 09:00–17:30
</td>
</tr>
<tr>
<td style="padding-bottom: 6px;">
<a href="https://www.inspiria.co.il/" target="_blank">
<img style="display: block;" src="https://i.postimg.cc/L60S3Tyy/inspiria-signature.png" alt="Inspiria Banner" width="210" height="auto" />
</a>
</td>
</tr>
<tr>
<td>
<a style="margin-right: 6px;" href="https://www.google.com/maps/search/?api=1&amp;query=Building+T,+Totseret+ha-Arets+St+3,+Petah+Tikva,+4951734" target="_blank">
<img style="height: 32px; width: 32px;" src="https://i.postimg.cc/CMvQ2CXL/location.png" alt="Location" /></a>
<a style="margin-right: 6px;" href="https://www.inspiria.co.il/" target="_blank">
<img style="height: 32px; width: 32px;" src="https://i.postimg.cc/XqvDJXGb/internet.png" alt="Website" /></a>
<a style="margin-right: 6px;" href="https://www.facebook.com/InspiriaExperts" target="_blank">
<img style="height: 32px; width: 32px;" src="https://i.postimg.cc/9FrnHRHP/facebook.png" alt="Facebook" /></a>
<a href="https://www.linkedin.com/company/inspiria-sap-b1-experts/" target="_blank">
<img style="height: 32px; width: 32px;" src="https://i.postimg.cc/gjBt6d86/linkedin.png" alt="LinkedIn - Inspiria" /></a>
</td>
</tr>
</tbody>
</table>
${showGreeting && greeting ? `<div style="margin-top:6px; color:#1a237e; font-size:15px;">${greeting}</div>` : ""}
    `;
  }
  return html;
}


  function handleGenerate(e) {
    e.preventDefault();
    setSignature(buildSignature());
  }

  function handleCopy() {
    if (!signature) return;
    const el = document.createElement("textarea");
    el.value = signature;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    alert(L.lang === "עברית" ? "החתימה הועתקה!" : "Signature copied!");
  }

  // ---- JSX ----
  return (
    <div dir="rtl" style={{
      minHeight: "100vh",
      width: "100vw",
      margin: 0,
      padding: 0,
      background: "var(--bg-main,#23272e)",
      backgroundImage: `url(${ICONS.logo})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top left",
      backgroundSize: "270px auto",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center"
    }}>
      {/* מצב תצוגה */}
      <div style={{ position: "fixed", top: 22, left: 36, zIndex: 2 }}>
        <select value={mode} onChange={e => setMode(e.target.value)}
          style={{
            background: "#292e37", color: "#8bb8f9", fontWeight: 600, fontSize: "1.06em",
            borderRadius: 16, border: "1.2px solid #396", padding: "9px 19px"
          }}>
          <option value="dark">🌙 כהה</option>
          <option value="light">🌞 בהיר</option>
          <option value="system">🖥️ מערכת</option>
        </select>
      </div>
      {/* טופס */}
      <form
        style={{
          margin: "64px auto 0 auto",
          width: "100%",
          maxWidth: 710,
          minHeight: 530,
          background: "var(--card-bg,#23262e)",
          borderRadius: 22,
          boxShadow: "0 8px 48px #0006",
          padding: "50px 44px 36px 44px",
          display: "flex",
          flexDirection: "column",
          gap: 28,
          alignItems: "center"
        }}
        onSubmit={handleGenerate}
      >
        {/* כותרת ולוגו */}
        <div style={{ textAlign: "center", width: "100%", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 13, justifyContent: "center" }}>
            <img src={ICONS.logo} alt="Inspiria" style={{ height: 55 }} />
            <span style={{ fontWeight: 800, fontSize: 26, color: "#2583d1" }}>מחולל חתימות אינספיריה</span>
          </div>
          <div style={{ color: "#c3e0ff", fontSize: 17, marginTop: 2 }}>הפק חתימה בעברית או אנגלית <b>בדקה</b></div>
        </div>
        {/* טאב עברית/אנגלית */}
        <div style={{ display: "flex", gap: 13, margin: "0 auto 10px auto" }}>
          <button type="button" style={tabBtnStyle(tab === "he")} onClick={() => { setTab("he"); setLang("he"); }}>{L.signature_he}</button>
          <button type="button" style={tabBtnStyle(tab === "en")} onClick={() => { setTab("en"); setLang("en"); }}>{L.signature_en}</button>
        </div>
        {/* שדות בטבלה עם מרווחים – שורה 1 */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 20,
          width: "100%"
        }}>
          <div>
            <label style={labelStyle()}>{L.name}</label>
            <input style={inputStyle()} value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label style={labelStyle()}>{L.role}</label>
            <input style={inputStyle()} value={role} onChange={e => setRole(e.target.value)} required />
          </div>
          <div>
            <label style={labelStyle()}>{L.email}</label>
            <input style={inputStyle()} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
        </div>
        {/* שורה 2 */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1.4fr 1fr",
          gap: 20,
          width: "100%"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <input type="checkbox" checked={showPhone} onChange={() => setShowPhone(x => !x)} />
            <label style={labelStyle()}>{L.hasPhone}</label>
            <input style={{ ...inputStyle(), width: 110 }} value={phone} onChange={e => setPhone(e.target.value)} placeholder={L.phone} disabled={!showPhone} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <input type="checkbox" checked={showLinkedin} onChange={() => setShowLinkedin(x => !x)} />
            <label style={labelStyle()}>{L.hasLinkedin}</label>
            <input style={{ ...inputStyle(), width: 215 }} value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder={L.linkedin_placeholder} disabled={!showLinkedin} />
            <a href={linkedin ? linkedin : "https://linkedin.com/"} target="_blank" rel="noopener noreferrer">
              <img src={ICONS.linkedin} alt="LinkedIn" style={{ height: 18, width: 18 }} />
            </a>
          </div>
          <div>
            <label style={labelStyle()}>{L.ext}</label>
            <input style={inputStyle()} value={ext} onChange={e => setExt(e.target.value)} placeholder={L.ext} />
          </div>
        </div>
        {/* שורה 3 – ברכה */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          width: "100%"
        }}>
          <input type="checkbox" checked={showGreeting} onChange={() => setShowGreeting(x => !x)} />
          <label style={labelStyle()}>{L.greeting}</label>
          <textarea style={{
            ...inputStyle(),
            width: 320, minHeight: 34, fontSize: "1.05em"
          }} placeholder={L.greeting_placeholder} value={greeting} onChange={e => setGreeting(e.target.value)} disabled={!showGreeting} />
        </div>
        {/* כפתור יצירת חתימה */}
        <button type="submit" style={mainBtnStyle()}>{L.generate}</button>
        {/* תצוגה והעתקה */}
        {signature && (
          <div style={{
            width: "100%", marginTop: 9, borderRadius: 13, background: "#fafcff", padding: 14
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
              <span style={{ fontWeight: 700 }}>{L.preview}:</span>
              <span>
                <button type="button" onClick={handleCopy} style={copyBtnStyle()}>{L.copy}</button>
                <button type="button" onClick={() => setShowPopup(true)} style={outlookBtnStyle()}>
                  <img src={ICONS.outlook} alt="Outlook" style={{ height: 18, verticalAlign: "middle", marginLeft: 7 }} />
                  {L.outlook}
                </button>
              </span>
            </div>
            <div className="preview-box" style={{ border: "1.5px solid #bce", borderRadius: 8, padding: 10, background: "#fff" }}
              dangerouslySetInnerHTML={{ __html: signature }} />
          </div>
        )}
        {/* פופאפ אאוטלוק */}
        {showPopup && (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            background: "#0008", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <div style={{
              width: 350, background: "#fff", borderRadius: 19, boxShadow: "0 8px 40px #0006",
              padding: 33, display: "flex", flexDirection: "column", alignItems: "center"
            }}>
              <img src={ICONS.outlook} alt="Outlook" style={{ height: 48, marginBottom: 10 }} />
              <div style={{ fontWeight: 700, fontSize: 18, color: "#2568c6", marginBottom: 7 }}>{L.outlook}</div>
              <ol style={{ color: "#222", fontSize: "1.03em", marginBottom: 13, textAlign: "right", direction: "rtl", lineHeight: 1.8 }}>
                <li>העתק את החתימה</li>
                <li>עבור לאאוטלוק > קובץ > אפשרויות > דואר > חתימות</li>
                <li>הדבק את החתימה ולחץ שמור</li>
              </ol>
              <button onClick={handleCopy} style={mainBtnStyle({ background: "#0e58cc" })}>{L.copy}</button>
              <a href="outlook:///" target="_blank" rel="noopener noreferrer" style={outlookBtnStyle()}>
                <img src={ICONS.outlook} alt="Outlook" style={{ height: 18, verticalAlign: "middle", marginLeft: 7 }} />
                {L.toOutlook}
              </a>
              <button onClick={() => setShowPopup(false)} style={{
                marginTop: 15, color: "#888", background: "none", border: "none", fontSize: 17, cursor: "pointer"
              }}>{L.close}</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

function mainBtnStyle(add = {}) {
  return {
    background: "#2678ee",
    color: "#fff",
    border: "none",
    borderRadius: 14,
    fontWeight: 700,
    fontSize: "1.08em",
    padding: "10px 33px",
    margin: "0 4px",
    boxShadow: "0 2px 10px #0262",
    cursor: "pointer",
    ...add
  };
}
function tabBtnStyle(active) {
  return {
    background: active ? "#2977c9" : "#22252d",
    color: active ? "#fff" : "#8bb8f9",
    border: "none",
    borderRadius: "12px 12px 0 0",
    fontWeight: 600,
    fontSize: "1.07em",
    padding: "8px 30px",
    cursor: "pointer"
  };
}
function copyBtnStyle() {
  return {
    background: "#e2eefd",
    color: "#1857ae",
    fontWeight: 700,
    border: "none",
    borderRadius: 11,
    fontSize: "1em",
    padding: "5px 18px",
    marginLeft: 9,
    cursor: "pointer"
  };
}
function outlookBtnStyle() {
  return {
    background: "#e2f0fd",
    color: "#1752a1",
    fontWeight: 700,
    border: "none",
    borderRadius: 11,
    fontSize: "1em",
    padding: "5px 16px",
    marginLeft: 9,
    cursor: "pointer"
  };
}
function labelStyle() {
  return {
    color: "#2583d1",
    fontWeight: 600,
    fontSize: "1.13em",
    marginLeft: 7
  };
}
function inputStyle() {
  return {
    border: "1.5px solid #bce",
    borderRadius: 8,
    padding: "8px 10px",
    fontSize: "1.06em",
    background: "#fff",
    color: "#222",
    outline: "none",
    minWidth: 0
  };
}
