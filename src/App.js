import React, { useState, useRef, useEffect } from "react";

// ---- ICONS ----
const ICONS = {
  linkedin: "https://cdn-icons-png.flaticon.com/24/174/174857.png",
  phone: "https://i.postimg.cc/SN3tSSmB/phone.png",
  location: "https://i.postimg.cc/CMvQ2CXL/location.png",
  website: "https://i.postimg.cc/XqvDJXGb/internet.png",
  facebook: "https://i.postimg.cc/9FrnHRHP/facebook.png",
  linkedinCompany: "https://i.postimg.cc/gjBt6d86/linkedin.png",
  banner: "https://i.postimg.cc/L60S3Tyy/inspiria-signature.png",
outlook: "https://img.icons8.com/color/96/microsoft-outlook-2019.png"
};
const INSPIRIA_LOGO_BG = "https://i.postimg.cc/dVq5SbJX/Inspiria-Logo.png";

// ---- DEFAULTS ----
const GREETING_DEFAULTS = {
  he: "בברכה,",
  en: "Best Regards,"
};

// ---- BODY STYLES ----
const style = document.createElement("style");
style.innerHTML = `
body.light-mode { background: #f6fafd !important; color: #1a237e; }
body.dark-mode { background: #212A34 !important; color: #eaf1fb !important; }
body.light-mode input, body.light-mode select { background: #fff !important; color: #222 !important; }
body.dark-mode input, body.dark-mode select { background: #232d39 !important; color: #f2f2f2 !important; }
body.light-mode .main-box { background: #fff !important; }
body.dark-mode .main-box { background: #232d39 !important; }
`;
if (!document.head.querySelector("style[data-inspiria]")) {
  style.setAttribute("data-inspiria", "true");
  document.head.appendChild(style);
}


// ---- STYLE OBJECTS ----
const mainBoxStyle = {
  maxWidth: 700,
  width: "99%",
  margin: "55px auto 0 auto",
  background: "rgba(255,255,255,0.97)",
  borderRadius: 22,
  boxShadow: "0 6px 38px #0002",
  padding: "44px 34px 32px 34px",
  position: "relative",
  zIndex: 1,
  minHeight: 550
};
const logoBgStyle = {
  background: `url(${INSPIRIA_LOGO_BG}) no-repeat center center/220px`,
  opacity: 0.09,
  zIndex: 0,
  position: "absolute",
  left: 0, top: 0, width: "100%", height: "100%",
  pointerEvents: "none"
};
const rowStyle = {
  display: "flex",
  flexDirection: "row",
  gap: 24,
  alignItems: "flex-end",
  marginBottom: 18
};
const colStyle = { display: "flex", flexDirection: "column", flex: 1, gap: 4 };
const labelStyle = { fontWeight: 500, marginBottom: 3, color: "#1a237e", fontSize: 16 };
const inputStyle = {
  border: "1.5px solid #bce",
  borderRadius: 8,
  padding: "10px 10px",
  fontSize: "1.1em",
  background: "#fff",
  color: "#222",
  outline: "none",
  minWidth: 0,
  width: "100%"
};
const checkStyle = { marginRight: 9, transform: "scale(1.11)" };
const tooltipIconStyle = {
  color: "#2678ee",
  cursor: "help",
  fontWeight: 800,
  marginLeft: 5,
  fontSize: "1.1em",
  display: "inline-block"
};
const tabBtnStyle = (active) => ({
  background: active ? "#2678ee" : "#f3f7fc",
  color: active ? "#fff" : "#2678ee",
  border: "none",
  borderRadius: "13px 13px 0 0",
  fontWeight: 700,
  fontSize: "1.11em",
  padding: "10px 38px",
  cursor: "pointer",
  marginRight: 8,
  boxShadow: active ? "0 2px 18px #2678ee18" : undefined,
  borderBottom: active ? "2.5px solid #2678ee" : "2.5px solid #f3f7fc"
});
const smallBtnStyle = {
  background: "#eaf2fa",
  color: "#2583d1",
  border: "1px solid #b3d2ef",
  borderRadius: 9,
  fontWeight: 600,
  fontSize: "1em",
  padding: "7px 19px",
  margin: "0 7px",
  cursor: "pointer",
  transition: "all .16s"
};
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

// ---- UTILS ----
function setColorModeState(mode) {
  localStorage.setItem("color-mode", mode);
  if (mode === "system") {
    document.body.classList.remove("light-mode", "dark-mode");
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.add("dark-mode");
    }
  } else {
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(mode === "light" ? "light-mode" : "dark-mode");
  }
}

// ---- COMPONENT ----
export default function SignatureGenerator() {
  const [tab, setTab] = useState("he"); // Hebrew or English
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
  const [colorMode, setColorMode] = useState(() => localStorage.getItem("color-mode") || "system");

  // apply mode on mount + on change
  useEffect(() => {
    setColorModeState(colorMode);
    if (colorMode === "system") {
      const listener = () => setColorModeState("system");
      window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', listener);
      return () => window.matchMedia('(prefers-color-scheme: light)').removeEventListener('change', listener);
    }
  }, [colorMode]);

  function handleModeChange(e) {
    setColorMode(e.target.value);
    setColorModeState(e.target.value);
  }

  useEffect(() => {
    setGreeting(GREETING_DEFAULTS[tab]);
  }, [tab]);

  // MAGIC COPY
  const previewRef = useRef(null);
  function handleCopy() {
    if (!previewRef.current) return;
    const range = document.createRange();
    range.selectNodeContents(previewRef.current);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    try {
      document.execCommand("copy");
      sel.removeAllRanges();
      alert(tab === "he" ? "החתימה הועתקה!" : "Signature copied!");
    } catch {
      alert(tab === "he" ? "שגיאה בהעתקה!" : "Copy failed!");
    }
  }

  // ---- BUILD SIGNATURE ----
  function buildSignature() {
    const isHe = tab === "he";
    const hasLinkedin = showLinkedin && (linkedin || true); // תמיד מציג אייקון עם קישור כללי אם לא סופק קישור
    const linkedinHref = linkedin || "https://www.linkedin.com/";
    const greetingHTML = showGreeting && greeting
      ? `<div style="margin-bottom:3px; color:#1a237e; font-size:15px;">${greeting}</div>`
      : "";

    if (isHe) {
      return `
<table dir="rtl" style="font-family: Arial,sans-serif; font-size: 14px; color: #000; text-align: right; direction: rtl; line-height: 1.6;" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="padding-bottom: 8px;">
${greetingHTML}
<span style="font-size: 17px; font-weight: bold; color: #1a237e;">${name || "שם מלא"}</span>
${showLinkedin ? `<a style="margin-right: 6px; vertical-align: middle;" href="${linkedinHref}" target="_blank">
  <img style="height: 18px; width: 18px;" src="${ICONS.linkedin}" alt="LinkedIn אישי" />
</a>` : ""}
<div style="color: #0044cc; font-size: 15px;">${role || "תפקיד"}</div>
<a style="color: #000; text-decoration: none;" href="mailto:${email}">${email}</a>${showPhone && phone ? ` | <a style="color: #000; text-decoration: none;" href="tel:${phone}">${phone}</a>` : ""}
</td>
</tr>
<tr>
<td style="padding-bottom: 5px;">
<span style="vertical-align: middle;"> <img style="height: 16px; width: 16px; vertical-align: middle; margin-left: 4px;" src="${ICONS.phone}" alt="טלפון משרד" /> 03-3743555${ext ? `, שלוחה ${ext}` : ""} </span>
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
<img style="display: block;" src="${ICONS.banner}" alt="Inspiria - אינספיריה" width="210" height="auto" />
</a>
</td>
</tr>
<tr>
<td>
<a style="margin-left: 6px;" href="https://www.google.com/maps/search/?api=1&amp;query=בנין+T,+Totseret+ha-Arets+St+3,+Petah+Tikva,+4951734" target="_blank">
<img style="height: 32px; width: 32px;" src="${ICONS.location}" alt="מיקום" /></a>
<a style="margin-left: 6px;" href="https://www.inspiria.co.il/" target="_blank">
<img style="height: 32px; width: 32px;" src="${ICONS.website}" alt="אתר אינטרנט" /></a>
<a style="margin-left: 6px;" href="https://www.facebook.com/InspiriaExperts" target="_blank">
<img style="height: 32px; width: 32px;" src="${ICONS.facebook}" alt="פייסבוק" /></a>
<a href="https://www.linkedin.com/company/inspiria-sap-b1-experts/" target="_blank">
<img style="height: 32px; width: 32px;" src="${ICONS.linkedinCompany}" alt="LinkedIn - אינספיריה" /></a>
</td>
</tr>
</tbody>
</table>
      `;
    }
    // ----- אנגלית -----
    return `
<table dir="ltr" style="font-family: Arial,sans-serif; font-size: 14px; color: #000; text-align: left; direction: ltr; line-height: 1.6;" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="padding-bottom: 8px;">
${greetingHTML}
<span style="font-size: 17px; font-weight: bold; color: #1a237e;">${name || "Full Name"}</span>
${showLinkedin ? `<a style="margin-left: 6px; vertical-align: middle;" href="${linkedinHref}" target="_blank">
  <img style="height: 18px; width: 18px;" src="${ICONS.linkedin}" alt="Personal LinkedIn" />
</a>` : ""}
<div style="color: #0044cc; font-size: 15px;">${role || "Role"}</div>
<a style="color: #000; text-decoration: none;" href="mailto:${email}">${email}</a>${showPhone && phone ? ` | <a style="color: #000; text-decoration: none;" href="tel:${phone}">${phone}</a>` : ""}
</td>
</tr>
<tr>
<td style="padding-bottom: 5px;">
<span style="vertical-align: middle;"> <img style="height: 16px; width: 16px; vertical-align: middle; margin-right: 4px;" src="${ICONS.phone}" alt="Office Phone" /> 03-3743555${ext ? `, Ext. ${ext}` : ""} </span>
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
<img style="display: block;" src="${ICONS.banner}" alt="Inspiria Banner" width="210" height="auto" />
</a>
</td>
</tr>
<tr>
<td>
<a style="margin-right: 6px;" href="https://www.google.com/maps/search/?api=1&amp;query=Building+T,+Totseret+ha-Arets+St+3,+Petah+Tikva,+4951734" target="_blank">
<img style="height: 32px; width: 32px;" src="${ICONS.location}" alt="Location" /></a>
<a style="margin-right: 6px;" href="https://www.inspiria.co.il/" target="_blank">
<img style="height: 32px; width: 32px;" src="${ICONS.website}" alt="Website" /></a>
<a style="margin-right: 6px;" href="https://www.facebook.com/InspiriaExperts" target="_blank">
<img style="height: 32px; width: 32px;" src="${ICONS.facebook}" alt="Facebook" /></a>
<a href="https://www.linkedin.com/company/inspiria-sap-b1-experts/" target="_blank">
<img style="height: 32px; width: 32px;" src="${ICONS.linkedinCompany}" alt="LinkedIn - Inspiria" /></a>
</td>
</tr>
</tbody>
</table>
    `;
  }

useEffect(() => {
  document.documentElement.setAttribute("dir", "rtl");
  document.body.style.direction = "rtl";
  document.body.style.textAlign = "right";
  return () => {
    document.documentElement.setAttribute("dir", "ltr");
    document.body.style.direction = "";
    document.body.style.textAlign = "";
  };
}, []);

  // ---- RENDER ----
  return (
    <div style={{ position: "relative", minHeight: 550 }}>
      {/* רקע לוגו אינספיריה */}
      <div style={logoBgStyle}></div>

      {/* מצב תצוגה – צד ימין */}
      <div style={modeSelectStyle}>
        <select value={colorMode} onChange={handleModeChange}>
          <option value="dark">🌙 כהה</option>
          <option value="light">🌞 בהיר</option>
          <option value="system">🖥️ מערכת</option>
        </select>
      </div>

      {/* תיבת תוכן מרכזית */}
      <div style={mainBoxStyle}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 18 }}>
          <button type="button" style={tabBtnStyle(tab === "he")} onClick={() => setTab("he")}>חתימה בעברית</button>
          <button type="button" style={tabBtnStyle(tab === "en")} onClick={() => setTab("en")}>חתימה באנגלית</button>
        </div>

        {/* שורה 1 */}
        <div style={{ ...rowStyle }}>
          <div style={colStyle}>
            <label style={labelStyle}>שם מלא</label>
            <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} autoComplete="off" />
          </div>
          <div style={colStyle}>
            <label style={labelStyle}>תפקיד</label>
            <input style={inputStyle} value={role} onChange={e => setRole(e.target.value)} autoComplete="off" />
          </div>
          <div style={colStyle}>
            <label style={labelStyle}>כתובת דוא"ל</label>
            <input style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} type="email" autoComplete="off" />
          </div>
        </div>

        {/* שורה 2 */}
        <div style={{ ...rowStyle }}>
          {/* טלפון נייד */}
          <div style={{ ...colStyle, flexBasis: 0, flexGrow: 1 }}>
            <label style={{ ...labelStyle, display: "flex", alignItems: "center" }}>
              <input type="checkbox" checked={showPhone} onChange={() => setShowPhone(!showPhone)} style={checkStyle} />
              <span title="לא חובה. מלא אם תרצה להוסיף את הטלפון הנייד שלך">טלפון נייד</span>
            </label>
            {showPhone && (
              <input style={inputStyle} value={phone} onChange={e => setPhone(e.target.value)} autoComplete="off" />
            )}
          </div>
          {/* לינקדין */}
          <div style={{ ...colStyle, flexBasis: 0, flexGrow: 1 }}>
            <label style={{ ...labelStyle, display: "flex", alignItems: "center" }}>
              <input type="checkbox" checked={showLinkedin} onChange={() => setShowLinkedin(!showLinkedin)} style={checkStyle} />
              <span>
                לינקדין
                <span style={tooltipIconStyle} title="לא חובה. קישור לפרופיל הלינקדאין האישי שלך">
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#2678ee" strokeWidth="2"/><text x="7.5" y="12" textAnchor="middle" fontSize="12" fill="#2678ee" fontWeight="bold">i</text></svg>
                </span>
              </span>
            </label>
            {showLinkedin && (
              <input
                style={inputStyle}
                value={linkedin}
                onChange={e => setLinkedin(e.target.value)}
                placeholder="קישור לפרופיל לינקדין"
                autoComplete="off"
              />
            )}
          </div>
        </div>

        {/* שורה 3 */}
        <div style={{ ...rowStyle }}>
          {/* שלוחה */}
          <div style={{ ...colStyle, maxWidth: 130 }}>
            <label style={labelStyle}>שלוחה</label>
            <input style={inputStyle} value={ext} onChange={e => setExt(e.target.value)} autoComplete="off" />
          </div>
          {/* הוסף ברכה */}
          <div style={{ ...colStyle, flex: 2 }}>
            <label style={{ ...labelStyle, display: "flex", alignItems: "center" }}>
              <input type="checkbox" checked={showGreeting} onChange={() => setShowGreeting(!showGreeting)} style={checkStyle} />
              הוסף ברכה
            </label>
            {showGreeting && (
              <input
                style={inputStyle}
                value={greeting}
                onChange={e => setGreeting(e.target.value)}
                autoComplete="off"
                placeholder={tab === "he" ? "בברכה," : "Best Regards,"}
              />
            )}
          </div>
        </div>

        {/* תצוגה מקדימה + כפתורים */}
        <div style={{ marginTop: 30, background: "#f6fafd", borderRadius: 12, padding: 16, minHeight: 60 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontWeight: 700, color: "#1a237e" }}>תצוגה מקדימה</span>
            <div>
              <button style={smallBtnStyle} onClick={handleCopy} type="button">העתק חתימה</button>
              <button style={smallBtnStyle} type="button" onClick={() => setShowOutlook(true)}>
                <img src={ICONS.outlook} alt="Outlook" style={{ width: 19, verticalAlign: "middle", marginLeft: 5, borderRadius: "40%" }} />
                עבור לאאוטלוק
              </button>
            </div>
          </div>
          <div ref={previewRef} style={{ background: "#fff", borderRadius: 10, padding: 18, minHeight: 60 }} dangerouslySetInnerHTML={{ __html: buildSignature() }} />
        </div>
      </div>

      {/* מודאל – הוראות Outlook */}
      {showOutlook && (
        <div style={{
          position: "fixed", zIndex: 50, top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.28)", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{
            background: "#fff", padding: 28, borderRadius: 20, width: 390, boxShadow: "0 2px 18px #2678ee24",
            position: "relative", textAlign: "right"
          }}>
            <button style={{
              position: "absolute", left: 16, top: 12, fontSize: 18, background: "none", border: "none", color: "#999", cursor: "pointer"
            }} onClick={() => setShowOutlook(false)}>&#10005;</button>
			<div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
			<img src={ICONS.outlook} alt="Outlook" style={{ width: 34, marginLeft: 7 }} />
			<span style={{ 
				fontWeight: 700, 
				fontSize: "1.16em", 
				color: "#1a237e"    // כחול כהה
			}}>
				הוראות לאאוטלוק
			</span>
			</div>
			<ol style={{ paddingRight: 15, color: "#222", fontSize: "1.08em", direction: "rtl", textAlign: "right" }}>
			<li>העתק את החתימה באמצעות הכפתור.</li>
			<li>לחץ על כפתור <b>עבור לאאוטלוק</b> למטה.</li>
			<li>היכנס ל־אאוטלוק &gt; הגדרות &gt; הצג את כל הגדרות אאוטלוק &gt; דואר &gt; חתימות.</li>
			<li>הדבק את החתימה בתיבת העריכה.</li>
			<li>שמור. זהו!</li>
			</ol>

            <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button style={smallBtnStyle} onClick={handleCopy}>העתק חתימה</button>
              <a
                href="https://outlook.live.com/mail/0/options/mail/layout/signature"
                target="_blank" rel="noopener noreferrer"
                style={{ ...smallBtnStyle, textDecoration: "none", display: "flex", alignItems: "center" }}
              >
                <img src={ICONS.outlook} alt="Outlook" style={{ width: 18, marginLeft: 6, borderRadius: "40%" }} />
                עבור לאאוטלוק
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
