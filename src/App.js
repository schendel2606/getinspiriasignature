import React, { useState } from "react";

const ICONS = {
  linkedin: "https://cdn-icons-png.flaticon.com/24/174/174857.png",
  phone: "https://i.postimg.cc/SN3tSSmB/phone.png",
  location: "https://i.postimg.cc/CMvQ2CXL/location.png",
  website: "https://i.postimg.cc/XqvDJXGb/internet.png",
  facebook: "https://i.postimg.cc/9FrnHRHP/facebook.png",
  linkedinCompany: "https://i.postimg.cc/gjBt6d86/linkedin.png",
  banner: "https://i.postimg.cc/L60S3Tyy/inspiria-signature.png",
};

const LABELS = {
  he: {
    lang: "עברית",
    name: "שם מלא",
    role: "תפקיד",
    email: "כתובת דוא\"ל",
    hasPhone: "האם ברצונך להוסיף טלפון אישי?",
    phone: "טלפון אישי",
    ext: "מספר שלוחה",
    linkedin: "קישור אישי ללינקדאין",
    generate: "צור חתימה",
    copy: "העתק חתימה",
    preview: "תצוגה מקדימה",
  },
  en: {
    lang: "English",
    name: "Full Name",
    role: "Role/Position",
    email: "Email Address",
    hasPhone: "Do you want to add a private phone?",
    phone: "Private Phone",
    ext: "Extension Number",
    linkedin: "Personal LinkedIn Link",
    generate: "Generate Signature",
    copy: "Copy Signature",
    preview: "Preview",
  },
};

function buildSignature({ lang, name, role, email, phone, ext, linkedin }) {
  const isHeb = lang === "he";
  return `
<table dir="${isHeb ? "rtl" : "ltr"}" style="font-family: Arial,sans-serif; font-size:14px; color:#000; text-align:${isHeb ? "right" : "left"}; direction:${isHeb ? "rtl" : "ltr"}; line-height:1.6;" cellspacing="0" cellpadding="0">
  <tr>
    <td style="padding-bottom:8px;">
      <span style="font-size:17px; font-weight:bold; color:#1a237e;">${name || (isHeb ? "שם מלא" : "Full Name")}</span>
      ${linkedin ? `
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

export default function SignatureGenerator() {
  const [lang, setLang] = useState("he");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [showPhone, setShowPhone] = useState(true);
  const [phone, setPhone] = useState("");
  const [ext, setExt] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [signature, setSignature] = useState("");

  const L = LABELS[lang];

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
      })
    );
  }

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

  return (
    <div className="max-w-xl mx-auto p-4 mt-8 border shadow-lg rounded-2xl bg-white" dir={lang === "he" ? "rtl" : "ltr"}>
      <form onSubmit={handleGenerate} className="space-y-3">
        <div className="flex space-x-3 space-x-reverse">
          <label>
            <input
              type="radio"
              checked={lang === "he"}
              onChange={() => setLang("he")}
            />{" "}
            עברית
          </label>
          <label>
            <input
              type="radio"
              checked={lang === "en"}
              onChange={() => setLang("en")}
            />{" "}
            English
          </label>
        </div>
        <div>
          <label>{L.name}:</label>
          <input className="border rounded px-2 py-1 ml-2" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>{L.role}:</label>
          <input className="border rounded px-2 py-1 ml-2" value={role} onChange={e => setRole(e.target.value)} required />
        </div>
        <div>
          <label>{L.email}:</label>
          <input className="border rounded px-2 py-1 ml-2" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>{L.hasPhone}</label>
          <input type="checkbox" className="ml-2" checked={showPhone} onChange={() => setShowPhone(!showPhone)} />
        </div>
        {showPhone && (
          <div>
            <label>{L.phone}:</label>
            <input className="border rounded px-2 py-1 ml-2" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
        )}
        <div>
          <label>{L.ext}:</label>
          <input className="border rounded px-2 py-1 ml-2" value={ext} onChange={e => setExt(e.target.value)} />
        </div>
        <div>
          <label>{L.linkedin}:</label>
          <input className="border rounded px-2 py-1 ml-2" value={linkedin} onChange={e => setLinkedin(e.target.value)} />
        </div>
        <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">{L.generate}</button>
      </form>
      {signature && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold">{L.preview}:</span>
            <button onClick={handleCopy} className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">{L.copy}</button>
          </div>
          <div className="border rounded p-3" style={{ background: "#fafcff" }} dangerouslySetInnerHTML={{ __html: signature }} />
          <div className="mt-2">
            <textarea value={signature} readOnly className="w-full h-32 border rounded p-2 text-xs" />
          </div>
        </div>
      )}
    </div>
  );
}
