// src/components/Common/Button.jsx
import React from 'react';

const Button = ({ onClick, children, className, type = 'button' }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
