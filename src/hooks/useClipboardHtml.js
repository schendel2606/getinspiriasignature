export function useClipboardHtml() {
  const copyHtml = async (node, setStatus) => {
    if (!node) return setStatus?.('Copy failed');
    
    try {
      const html = node.innerHTML || '';
      const text = node.textContent || '';
      
      if (navigator.clipboard && window.isSecureContext) {
        const item = new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([text], { type: 'text/plain' }),
        });
        await navigator.clipboard.write([item]);
        setStatus?.('Signature copied successfully!');
      } else {
        const range = document.createRange();
        range.selectNodeContents(node);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        const ok = document.execCommand('copy');
        sel.removeAllRanges();
        setStatus?.(ok ? 'Signature copied!' : 'Copy failed');
      }
    } catch {
      setStatus?.('Copy failed');
    }
  };
  
  return { copyHtml };
}
