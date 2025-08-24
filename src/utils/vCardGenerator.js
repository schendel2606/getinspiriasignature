export function generateVCard(data) {
  const { name, role, email, phone, ext } = data;
  
  let vcard = 'BEGIN:VCARD\n';
  vcard += 'VERSION:3.0\n';
  
  if (name) {
    vcard += `FN:${name}\n`;
    vcard += `N:${name};;;\n`;
  }
  
  if (role) {
    vcard += `TITLE:${role}\n`;
  }
  
  if (email) {
    vcard += `EMAIL;TYPE=WORK:${email}\n`;
  }
  
  if (phone) {
    vcard += `TEL;TYPE=CELL:${phone}\n`;
  }
  
  // Office phone with extension
  let officePhone = '03-3743555';
  if (ext) {
    officePhone += `,${ext}`;
  }
  vcard += `TEL;TYPE=WORK:${officePhone}\n`;
  
  // Company info
  vcard += 'ORG:Inspiria\n';
  vcard += 'URL:https://www.inspiria.co.il\n';
  vcard += 'ADR;TYPE=WORK:;;Building T, Totseret ha-Arets St 3;Petah Tikva;;4951734;Israel\n';
  
  vcard += 'END:VCARD';
  
  return vcard;
}

export function downloadVCard(data, filename = 'inspiria-contact.vcf') {
  const vcardContent = generateVCard(data);
  const blob = new Blob([vcardContent], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
