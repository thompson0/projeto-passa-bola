import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  isLoading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-pink-500 hover:bg-pink-600 text-white rounded-[12px] shadow-soft focus:ring-2 focus:ring-lilac/30',
    outline: 'border-2 border-lilac text-primary hover:bg-lilac/10 rounded-[12px] focus:ring-2 focus:ring-lilac/30',
    ghost: 'text-primary hover:bg-lilac/10 rounded-[12px] focus:ring-2 focus:ring-lilac/30',
    icon: 'w-10 h-10 rounded-full flex items-center justify-center bg-lilac/10 text-primary hover:bg-lilac/20 focus:ring-2 focus:ring-lilac/30',
  };
  
  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-[48px] px-6 text-base',
    lg: 'h-14 px-8 text-lg',
  };
  
  // Don't apply size classes to icon variant
  const sizeClasses = variant === 'icon' ? '' : sizes[size];
  const classes = `${baseClasses} ${variants[variant]} ${sizeClasses} ${className}`;
  
  return (
    <button 
      className={classes} 
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Carregando...</span>
        </div>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="mr-2">{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className="ml-2">{icon}</span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;