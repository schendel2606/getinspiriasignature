import React, { useEffect, useState } from 'react';

const notificationStyle = {
  position: 'fixed',
  top: 20,
  right: 20,
  background: '#d4edda',
  color: '#155724',
  border: '1px solid #c3e6cb',
  borderRadius: 8,
  padding: '12px 20px',
  fontSize: '0.9em',
  fontWeight: 500,
  zIndex: 1000,
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  transform: 'translateX(100%)',
  transition: 'transform 0.3s ease',
  maxWidth: 300,
  wordBreak: 'break-word'
};

const notificationVisibleStyle = {
  ...notificationStyle,
  transform: 'translateX(0)'
};

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
    <div style={isShowing ? notificationVisibleStyle : notificationStyle}>
      ✅ {message}
    </div>
  );
}
