import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  ...props 
}) => {
  return (
    <div 
      className={`
        card-base
        ${hover ? 'hover:shadow-hover transition-shadow duration-300' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <div 
      className={`mb-4 pb-4 border-b border-border ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <h3 
      className={`text-xl font-bold text-text ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardContent = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <div 
      className={`${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardFooter = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <div 
      className={`mt-4 pt-4 border-t border-border ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;