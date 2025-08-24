export function isNonEmpty(v) {
  return !!(v && String(v).trim());
}

export function isValidLinkedin(url) {
  if (!isNonEmpty(url)) return false;
  try { 
    const u = new URL(url); 
    return u.hostname.includes('linkedin.com'); 
  } catch { 
    return false; 
  }
}

export function validateForm(data, language) {
  const errors = {};

  if (!isNonEmpty(data.name)) {
    errors.name = language === "he" ? "שם מלא הוא שדה חובה" : "Full name is required";
  }

  if (!isNonEmpty(data.role)) {
    errors.role = language === "he" ? "תפקיד הוא שדה חובה" : "Role is required";
  }

  if (!isNonEmpty(data.email)) {
    errors.email = language === "he" ? "כתובת דוא״ל היא שדה חובה" : "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = language === "he" ? "כתובת דוא״ל לא תקינה" : "Invalid email address";
  }

  // Only validate phone if there's a value
  if (isNonEmpty(data.phone)) {
    if (!/^[\d\s\-\+\(\)]+$/.test(data.phone.trim())) {
      errors.phone = language === "he" ? "מספר טלפון לא תקין" : "Invalid phone number";
    }
  }

  // Only validate LinkedIn if there's a value
  if (isNonEmpty(data.linkedin)) {
    if (!isValidLinkedin(data.linkedin)) {
      errors.linkedin = language === "he" ? "קישור לינקדין לא תקין" : "Invalid LinkedIn URL";
    }
  }

  return errors;
}
