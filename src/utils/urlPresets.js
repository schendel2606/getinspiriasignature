export function encodeFormData(data) {
  try {
    const compressed = btoa(JSON.stringify(data));
    return encodeURIComponent(compressed);
  } catch (error) {
    console.warn('Error encoding form data:', error);
    return '';
  }
}

export function decodeFormData(encoded) {
  try {
    const decoded = decodeURIComponent(encoded);
    return JSON.parse(atob(decoded));
  } catch (error) {
    console.warn('Error decoding form data:', error);
    return null;
  }
}

export function getPresetFromURL() {
  const isBrowser = typeof window !== 'undefined';
  if (!isBrowser) return null;
  
  const urlParams = new URLSearchParams(window.location.search);
  const preset = urlParams.get('preset');
  
  if (preset) {
    return decodeFormData(preset);
  }
  
  return null;
}

export function generateSharableLink(data) {
  const isBrowser = typeof window !== 'undefined';
  if (!isBrowser) return '';
  
  const encoded = encodeFormData(data);
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?preset=${encoded}`;
}

export function copyToClipboard(text) {
  const isBrowser = typeof navigator !== 'undefined' && navigator.clipboard;
  
  if (isBrowser && navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    return success ? Promise.resolve() : Promise.reject();
  }
}
