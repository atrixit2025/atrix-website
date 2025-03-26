import React, { useState, useEffect } from 'react';
import './CustomAlert.css'; // We'll create this next

const CustomAlert = ({ type, message, onClose, show }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
    if (show) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 5000); // Auto-close after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!visible) return null;

  const alertClasses = `custom-alert ${type}`;

  return (
    <div className={alertClasses}>
      <div className="alert-content">
        <span>{message}</span>
        <button onClick={() => {
          setVisible(false);
          onClose();
        }} className="alert-close-btn">
          &times;
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;