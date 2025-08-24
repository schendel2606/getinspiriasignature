import { ICONS } from '../constants/icons.js';

function getIconsRow(icons, align = "left") {
  return `
    <table border="0" cellspacing="0" cellpadding="0" align="${align}" dir="${align==='right' ? 'rtl' : 'ltr'}" style="border-collapse:collapse;">
      <tr>
        ${icons.map(icon => `
          <td width="32" height="32" align="center" valign="middle" style="padding:0 3px;">
            <a href="${icon.link}" target="_blank">
              <img src="${icon.src}" width="32" height="32" alt="${icon.alt}" style="display:block;border:0;outline:none;text-decoration:none;" />
            </a>
          </td>
        `).join('')}
      </tr>
    </table>
  `;
}

export function buildSignatureHtml(props) {
  const {
    tab = "he",
    name = "",
    role = "",
    email = "",
    phone = "",
    showPhone = false,
    ext = "",
    showLinkedin = false,
    linkedin = "",
    showGreeting = false,
    greeting = "",
    target = "outlook"
  } = props;

  const isHe = tab === "he";
  const linkedinHref = linkedin || "https://www.linkedin.com/";
  const greetingHTML = showGreeting && greeting
    ? `<div style="margin-bottom:3px; color:#1a237e; font-size:15px;">${greeting}</div>`
    : "";

  const iconArrayHe = [
    {
      link: "https://www.google.com/maps/search/?api=1&query=בנין+T,+Totseret+ha-Arets+St+3,+Petah+Tikva,+4951734",
      src: ICONS.location,
      alt: "מיקום"
    },
    {
      link: "https://www.inspiria.co.il/",
      src: ICONS.website,
      alt: "אתר אינטרנט"
    },
    {
      link: "https://www.facebook.com/InspiriaExperts",
      src: ICONS.facebook,
      alt: "פייסבוק"
    },
    {
      link: "https://www.linkedin.com/company/inspiria-sap-b1-experts/",
      src: ICONS.linkedinCompany,
      alt: "LinkedIn - אינספיריה"
    }
  ];

  const iconArrayEn = [
    {
      link: "https://www.google.com/maps/search/?api=1&query=Building+T,+Totseret+ha-Arets+St+3,+Petah+Tikva,+4951734",
      src: ICONS.location,
      alt: "Location"
    },
    {
      link: "https://www.inspiria.co.il/",
      src: ICONS.website,
      alt: "Website"
    },
    {
      link: "https://www.facebook.com/InspiriaExperts",
      src: ICONS.facebook,
      alt: "Facebook"
    },
    {
      link: "https://www.linkedin.com/company/inspiria-sap-b1-experts/",
      src: ICONS.linkedinCompany,
      alt: "LinkedIn - Inspiria"
    }
  ];

  if (isHe) {
    return `
<table dir="rtl" style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #000; text-align: right; direction: rtl; line-height: 1.6; border-collapse: collapse;" cellspacing="0" cellpadding="0" width="100%">
<tbody>
<tr>
<td style="padding-bottom: 8px; border: none;" align="right">
${greetingHTML}
<span style="font-size: 17px; font-weight: bold; color: #1a237e; display: inline-block;">${name || "שם מלא"}</span>
${showLinkedin ? `<a style="margin-right: 6px; vertical-align: middle; text-decoration: none;" href="${linkedinHref}" target="_blank">
  <img src="${ICONS.linkedin}" width="18" height="18" style="display:inline-block;width:18px;height:18px;border:0;outline:none;text-decoration:none;vertical-align:middle;" alt="LinkedIn אישי" />
</a>` : ""}
<div style="color: #0044cc; font-size: 15px; margin-top: 2px;">${role || "תפקיד"}</div>
<a style="color: #000; text-decoration: none;" href="mailto:${email}">${email}</a>${showPhone && phone ? ` | <a style="color: #000; text-decoration: none;" href="tel:${phone}">${phone}</a>` : ""}
</td>
</tr>
<tr>
<td style="padding-bottom: 5px; border: none;" align="right">
<span style="vertical-align: middle;">
  <img src="${ICONS.phone}" width="16" height="16" style="display:inline-block;width:16px;height:16px;border:0;outline:none;text-decoration:none;vertical-align:middle;margin-left:4px;" alt="טלפון משרד" />
  03-3743555${ext ? `, שלוחה ${ext}` : ""}
</span>
</td>
</tr>
<tr>
<td style="color:#888; font-size:12px; padding-bottom: 2px; border: none;" align="right">
<b>שעות פעילות:</b> ימים א'-ה' 09:00–17:30
</td>
</tr>
<tr>
<td style="padding-bottom: 6px; border: none;" align="right">
<a href="https://www.inspiria.co.il/" target="_blank" style="text-decoration: none;">
  <img src="${ICONS.banner}" alt="Inspiria - אינספיריה" width="230" style="display:block; height:auto; border:0; outline:none; margin:0; padding:0;" />
</a>
</td>
</tr>
<tr>
<td align="right" style="padding-bottom: 0; border: none;">
${getIconsRow(iconArrayHe, "right")}
</td>
</tr>
</tbody>
</table>
    `;
  }

  // English version
  return `
<table dir="ltr" style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #000; text-align: left; direction: ltr; line-height: 1.6; border-collapse: collapse;" cellspacing="0" cellpadding="0" width="100%">
<tbody>
<tr>
<td style="padding-bottom: 8px; border: none;" align="left">
${greetingHTML}
<span style="font-size: 17px; font-weight: bold; color: #1a237e; display: inline-block;">${name || "Full Name"}</span>
${showLinkedin ? `<a style="margin-left: 6px; vertical-align: middle; text-decoration: none;" href="${linkedinHref}" target="_blank">
  <img src="${ICONS.linkedin}" width="18" height="18" style="display:inline-block;width:18px;height:18px;border:0;outline:none;text-decoration:none;vertical-align:middle;" alt="Personal LinkedIn" />
</a>` : ""}
<div style="color: #0044cc; font-size: 15px; margin-top: 2px;">${role || "Role"}</div>
<a style="color: #000; text-decoration: none;" href="mailto:${email}">${email}</a>${showPhone && phone ? ` | <a style="color: #000; text-decoration: none;" href="tel:${phone}">${phone}</a>` : ""}
</td>
</tr>
<tr>
<td style="padding-bottom: 5px; border: none;" align="left">
<span style="vertical-align: middle;">
  <img src="${ICONS.phone}" width="16" height="16" style="display:inline-block;width:16px;height:16px;border:0;outline:none;text-decoration:none;vertical-align:middle;margin-right:4px;" alt="Office Phone" />
  03-3743555${ext ? `, Ext. ${ext}` : ""}
</span>
</td>
</tr>
<tr>
<td style="color:#888; font-size:12px; padding-bottom: 2px; border: none;" align="left">
<b>Working hours:</b> Sun-Thu 09:00–17:30
</td>
</tr>
<tr>
<td style="padding-bottom: 6px; border: none;" align="left">
<a href="https://www.inspiria.co.il/" target="_blank" style="text-decoration: none;">
<img src="${ICONS.banner}" alt="Inspiria Banner" width="210" style="display:block; height:auto; border:0; outline:none;" />
</a>
</td>
</tr>
<tr>
<td align="left" style="padding-bottom: 0; border: none;">
${getIconsRow(iconArrayEn, "left")}
</td>
</tr>
</tbody>
</table>
  `;
}
