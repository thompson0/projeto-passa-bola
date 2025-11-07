import React from 'react';

const Pill = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const variants = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-green/10 text-green',
    warning: 'bg-yellow-500/10 text-yellow-600',
    danger: 'bg-red/10 text-red',
    info: 'bg-blue-500/10 text-blue-600',
  };
  
  return (
    <span 
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Pill;