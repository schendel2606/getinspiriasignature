export const validateForm = (data, language = 'he') => {
  const errors = {};
  
  if (!data.name?.trim()) {
    errors.name = language === "he" ? "שם מלא הוא שדה חובה" : "Full name is required";
  }
  
  if (!data.role?.trim()) {
    errors.role = language === "he" ? "תפקיד הוא שדה חובה" : "Role is required";
  }
  
  if (!data.email?.trim()) {
    errors.email = language === "he" ? "כתובת דוא\"ל היא שדה חובה" : "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = language === "he" ? "כתובת דוא\"ל לא תקינה" : "Invalid email address";
  }
  
  if (data.showPhone && data.phone && !/^[\d\s\-\+\(\)]+$/.test(data.phone)) {
    errors.phone = language === "he" ? "מספר טלפון לא תקין" : "Invalid phone number";
  }
  
  if (data.showLinkedin && data.linkedin && !data.linkedin.includes('linkedin.com')) {
    errors.linkedin = language === "he" ? "קישור לינקדין לא תקין" : "Invalid LinkedIn URL";
  }
  
  return errors;
};
