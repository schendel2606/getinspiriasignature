import React, { useState } from "react";

const ICONS = {
  linkedin: "https://cdn-icons-png.flaticon.com/24/174/174857.png",
  outlook: "https://cdn-icons-png.flaticon.com/128/732/732223.png", // Outlook
  banner: "https://i.postimg.cc/L60S3Tyy/inspiria-signature.png",
  logo: "https://i.postimg.cc/dVq5SbJX/Inspiria-Logo.png",
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
    hasLinkedin: "להוסיף לינקדאין אישי?",
    linkedin: "קישור לינקדאין אישי",
    hasGreeting: "להוסיף ברכה אישית?",
    greeting: "בברכה,\nניב שנדל",
    greeting_placeholder: "בברכה,\nשם העובד\n—\nשיהיה יום נהדר!",
    generate: "צור חתימה",
    copy: "העתק חתימה",
    preview: "תצוגה מקדימה",
    workingHours: "שעות פעילות: א'-ה' 09:00–17:30",
    signature_he: "חתימה בעברית",
    signature_en: "חתימה באנגלית",
    outlook: "איך להגדיר חתימה באאוטלוק?",
    howTo: `1. לחץ "העתק חתימה"\n2. עבור לאאוטלוק > קובץ > אפשרויות > דואר > חתימות\n3. הדבק את החתימה החדשה ולחץ שמור`,
    toOutlook: "מעבר לאאוטלוק",
    close: "סגור",
    linkedin_placeholder: "לינק לפרופיל (למשל: https://linkedin.com/in/you)"
  },
  en: {
    lang: "English",
    name: "Full Name",
    role: "Role",
    email: "Email Address",
    hasPhone: "Add Private Phone?",
    phone: "Private Phone",
    ext: "Extension",
    hasLinkedin: "Add Personal LinkedIn?",
    linkedin: "Personal LinkedIn URL",
    hasGreeting: "Add Greeting?",
    greeting: "Best regards,\nNiv Schendel",
    greeting_placeholder: "Best regards,\nYour Name\n—\nHave a great day!",
    generate: "Generate Signature",
    copy: "Copy Signature",
    preview: "Preview",
    workingHours: "Working hours: Sun-Thu 09:00–17:30",
    signature_he: "Hebrew Signature",
    signature_en: "English Signature",
    outlook: "How to set signature in Outlook?",
    howTo: `1. Click "Copy Signature"\n2. Go to Outlook > File > Options > Mail > Signatures\n3. Paste the signature and save`,
    toOutlook: "Go to Outlook",
    close: "Close",
    linkedin_placeholder: "Profile link (e.g.: https://linkedin.com/in/you)"
  }
};

function buildSignature({ lang, name, role, email, phone, ext, linkedin, greeting }) {
  const isHeb = lang === "he";
  const workHours = isHeb ? LABELS.he.workingHours : LABELS.en.workingHours;
  return `
  <table dir="${isHeb ? "rtl" : "ltr"}" style="font-family:Arial,sans-serif; font-size:14px; color:#222; text-align:${isHeb ? "right" : "left"}; direction:${isHeb ? "rtl" : "ltr"}; line-height:1.6; width:500px;">
    <tr>
      <td style="padding-bottom:8px;">
        <span style="font-size:17px; font-weight:bold; color:#1a237e;">${name || (isHeb ? "שם מלא" : "Full Name")}</span>
        ${linkedin ? `<a href="${linkedin}" target="_blank" style="${isHeb ? "margin-right" : "margin-left"}:6px; vertical-align:middle;"><img src="${ICONS.linkedin}" alt="LinkedIn" style="height:18px; width:18px;"></a>` : ""}
        <div style="color:#0044cc; font-size:15px;">${role || (isHeb ? "תפקיד" : "Role")}</div>
        <a href="mailto:${email}" style="color:#000; text-decoration:none;">${email}</a>
        ${phone ? ` | <a href="tel:${phone}" style="color:#000; text-decoration:none;">${phone}</a>` : ""}
      </td>
    </tr>
    <tr>
      <td style="padding-bottom:3px;">
        <span style="vertical-align:middle;">
          <b>${isHeb ? "שלוחה" : "Ext."}</b> ${ext || "-"}
        </span>
      </td>
    </tr>
    <tr>
      <td style="color:#888; font-size:13px; padding-bottom:2px;">
        ${workHours}
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
      <td style="font-size:13px; color:#223; white-space:pre-line;">
        ${greeting ? greeting : ""}
      </td>
    </tr>
  </table>
  `.replace(/\s{2,}/g, " ");
}

export default function SignatureApp() {
  // --- State variables ---
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
  const [tab, setTab] = useState("he"); // "he" or "en"
  const [showPopup, setShowPopup] = useState(false);
  const [mode, setMode] = useState(localStorage.getItem("color-mode") || "system");

  // --- Labels ---
  const L = LABELS[lang];

  // --- Mode change handler ---
  React.useEffect(() => {
    function applyMode(mode) {
      if (mode === "light") document.body.classList.add("light-mode");
      else document.body.classList.remove("light-mode");
    }
    if (mode === "system") {
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      applyMode(prefersLight ? "light" : "dark");
    } else {
      applyMode(mode);
    }
    localStorage.setItem("color-mode", mode);
  }, [mode]);

  // --- Generate signature handler ---
  function handleGenerate(e) {
    e.preventDefault();
    setSignature(buildSignature({
      lang: tab,
      name, role, email,
      phone: showPhone ? phone : "",
      ext,
      linkedin: showLinkedin ? linkedin : "",
      greeting: showGreeting ? (greeting || L.greeting) : "",
    }));
  }

  // --- Copy signature (html) ---
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

  // --- UI ---
  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        background: "#23272e",
        backgroundImage: `url(${ICONS.logo})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top left",
        backgroundSize: "300px auto",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
      }}
    >
      {/* מצב תצוגה */}
      <div style={{ position: "fixed", top: 20, right: 44, zIndex: 3 }}>
        <select value={mode} onChange={e => setMode(e.target.value)}
          style={{
            background: "#292e37", color: "#8bb8f9", fontWeight: 600, fontSize: "1.04em",
            borderRadius: 15, border: "1.2px solid #395", padding: "8px 18px"
          }}>
          <option value="dark">🌙 כהה</option>
          <option value="light">🌞 בהיר</option>
          <option value="system">🖥️ מערכת</option>
        </select>
      </div>
      {/* טופס */}
      <div
        style={{
          width: "100%",
          maxWidth: 1050,
          minHeight: 420,
          margin: "60px auto 0 auto",
          borderRadius: 26,
          boxShadow: "0 10px 54px #0004",
          padding: "40px 58px 36px 58px",
          background: "#23262e",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          alignItems: "center",
          position: "relative"
        }}
      >
        {/* לוגו וכותרת */}
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <img src={ICONS.logo} alt="Inspiria" style={{ height: 60, marginBottom: 3 }} />
          <div style={{ fontWeight: 800, fontSize: 26, color: "#2583d1", marginTop: 0 }}>מחולל חתימות אינספיריה</div>
          <div style={{ color: "#c3e0ff", fontSize: 17, marginBottom: 6 }}>מייצרים חתימות מייל מעוצבות לכל עובדי אינספיריה</div>
        </div>
        {/* לשוניות חתימה */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <button
            className={tab === "he" ? "tab-active" : ""}
            style={{
              padding: "10px 28px",
              background: tab === "he" ? "#2964e0" : "#272b32",
              color: tab === "he" ? "#fff" : "#8bb8f9",
              borderRadius: "13px 13px 0 0",
              fontSize: 18,
              fontWeight: 700,
              border: "none",
              cursor: "pointer"
            }}
            onClick={() => { setTab("he"); setLang("he"); }}
          >חתימה בעברית</button>
          <button
            className={tab === "en" ? "tab-active" : ""}
            style={{
              padding: "10px 28px",
              background: tab === "en" ? "#2964e0" : "#272b32",
              color: tab === "en" ? "#fff" : "#8bb8f9",
              borderRadius: "13px 13px 0 0",
              fontSize: 18,
              fontWeight: 700,
              border: "none",
              cursor: "pointer"
            }}
            onClick={() => { setTab("en"); setLang("en"); }}
          >חתימה באנגלית</button>
        </div>
        {/* שדות שורה 1 */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, width: "100%", marginBottom: 10
        }}>
          <div>
            <label style={labelStyle()}>{L.name}:</label>
            <input style={inputStyle()} value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label style={labelStyle()}>{L.role}:</label>
            <input style={inputStyle()} value={role} onChange={e => setRole(e.target.value)} required />
          </div>
          <div>
            <label style={labelStyle()}>{L.email}:</label>
            <input style={inputStyle()} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
        </div>
        {/* שדות שורה 2 */}
        <div style={{
          display: "grid", gridTemplateColumns: "1.2fr 1.2fr 1fr", gap: 18, width: "100%", marginBottom: 8
        }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input type="checkbox" checked={showPhone} onChange={() => setShowPhone(x => !x)} style={{ marginLeft: 6 }} />
            <label style={labelStyle()}>{L.hasPhone}</label>
            <input style={{ ...inputStyle(), marginRight: 10, width: 120 }} value={phone} onChange={e => setPhone(e.target.value)} placeholder="05x-xxxxxxx" disabled={!showPhone} />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input type="checkbox" checked={showLinkedin} onChange={() => setShowLinkedin(x => !x)} style={{ marginLeft: 6 }} />
            <label style={labelStyle()}>{L.hasLinkedin}</label>
            <input style={{ ...inputStyle(), marginRight: 10, width: 210 }} value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder={L.linkedin_placeholder} disabled={!showLinkedin} />
            {/* לוגו לינקדאין מוביל לעמוד הבית אם ריק */}
            <a href={linkedin ? linkedin : "https://linkedin.com/"} target="_blank" rel="noopener noreferrer">
              <img src={ICONS.linkedin} alt="LinkedIn" style={{ height: 18, width: 18, marginLeft: 8 }} />
            </a>
          </div>
          <div>
            <label style={labelStyle()}>{L.ext}:</label>
            <input style={inputStyle()} value={ext} onChange={e => setExt(e.target.value)} placeholder={tab === "he" ? "שלוחה (לא חובה)" : "Extension (optional)"} />
          </div>
        </div>
        {/* שורה 3 – ברכה */}
        <div style={{
          display: "flex", alignItems: "center", width: "100%", marginBottom: 14
        }}>
          <input type="checkbox" checked={showGreeting} onChange={() => setShowGreeting(x => !x)} style={{ marginLeft: 6 }} />
          <label style={labelStyle()}>{L.hasGreeting}</label>
          <textarea
            style={{ ...inputStyle(), marginRight: 10, width: 350, minHeight: 38, fontSize: "1.05em" }}
            placeholder={L.greeting_placeholder}
            value={greeting}
            onChange={e => setGreeting(e.target.value)}
            disabled={!showGreeting}
          />
        </div>
        {/* כפתור יצירת חתימה */}
        <button type="submit" onClick={handleGenerate}
          style={{
            background: "#2964e0", color: "#fff", fontWeight: 700, fontSize: "1.13em",
            padding: "12px 44px", borderRadius: 22, marginTop: 5, marginBottom: 3, border: "none", cursor: "pointer"
          }}>{L.generate}</button>
        {/* תצוגה/העתקה */}
        {signature && (
          <div style={{
            width: "100%", marginTop: 15, borderRadius: 15, background: "#fafcff", padding: 14
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
              <span style={{ fontWeight: 700 }}>{L.preview}:</span>
              <span>
                <button onClick={handleCopy}
                  style={{ background: "#d6e8fd", color: "#2964e0", border: "none", borderRadius: 11, fontWeight: 700, padding: "5px 16px", fontSize: "1em", marginLeft: 8 }}>{L.copy}</button>
                <button onClick={() => setShowPopup(true)}
                  style={{ background: "#e7e7f7", color: "#1157bb", border: "none", borderRadius: 11, fontWeight: 700, padding: "5px 16px", fontSize: "1em" }}>
                  <img src={ICONS.outlook} alt="Outlook" style={{ height: 18, verticalAlign: "middle", marginRight: 5 }} />
                  {L.outlook}
                </button>
              </span>
            </div>
            <div className="preview-box" style={{ border: "1.5px solid #bce", borderRadius: 8, padding: 10, background: "#fff" }}
              dangerouslySetInnerHTML={{ __html: signature }} />
          </div>
        )}
        {/* פופאפ הדרכה לאאוטלוק */}
        {showPopup && (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            background: "#0009", zIndex: 9, display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <div style={{
              width: 380, background: "#fff", borderRadius: 20, boxShadow: "0 8px 40px #0007",
              padding: 36, display: "flex", flexDirection: "column", alignItems: "center"
            }}>
              <img src={ICONS.outlook} alt="Outlook" style={{ height: 54, marginBottom: 13 }} />
              <div style={{ fontWeight: 700, fontSize: 19, color: "#2568c6", marginBottom: 7 }}>{L.outlook}</div>
              <pre style={{ color: "#223", fontSize: "1em", marginBottom: 12, whiteSpace: "pre-line", textAlign: "left" }}>{L.howTo}</pre>
              <button onClick={handleCopy}
                style={{ background: "#257bf6", color: "#fff", fontWeight: 700, border: "none", borderRadius: 13, fontSize: "1em", padding: "6px 20px", marginBottom: 7 }}>
                {L.copy}
              </button>
              <a href="outlook:///" target="_blank" rel="noopener noreferrer"
                style={{ background: "#d4e3ff", color: "#135bbf", borderRadius: 13, padding: "7px 19px", fontWeight: 700, textDecoration: "none" }}>
                <img src={ICONS.outlook} alt="Outlook" style={{ height: 18, verticalAlign: "middle", marginRight: 7 }} />
                {L.toOutlook}
              </a>
              <button onClick={() => setShowPopup(false)}
                style={{ marginTop: 15, color: "#888", background: "none", border: "none", fontSize: 17, cursor: "pointer" }}>{L.close}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function labelStyle() {
  return { color: "#c3e0ff", fontWeight: 500, fontSize: "1.1em", marginLeft: 8 };
}
function inputStyle() {
  return {
    border: "1.5px solid #bce",
    borderRadius: 8,
    padding: "8px 10px",
    fontSize: "1.05em",
    background: "#fff",
    color: "#222",
    outline: "none",
    minWidth: 0,
    marginRight: 3
  };
}
