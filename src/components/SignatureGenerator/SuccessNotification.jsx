import React, { useEffect, useState } from 'react';

export function SuccessNotification({ message, isVisible, onClose }) {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsShowing(true);
      const timer = setTimeout(() => {
        setIsShowing(false);
        setTimeout(onClose, 300); // Wait for animation to complete
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`success-notification ${isShowing ? 'visible' : ''}`}>
      ✅ {message}
    </div>
  );
}
