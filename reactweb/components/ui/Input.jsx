import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
  label, 
  id, 
  error, 
  helperText,
  className = '',
  type = 'text',
  icon,
  iconPosition = 'left',
  ...props 
}, ref) => {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-text"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
            {icon}
          </div>
        )}
        <input
          id={id}
          ref={ref}
          type={type}
          className={`
            input-base
            ${error ? 'border-red focus:border-red focus:ring-red/30' : ''}
            ${icon && iconPosition === 'left' ? 'pl-10' : ''}
            ${icon && iconPosition === 'right' ? 'pr-10' : ''}
            ${className}
          `}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
            {icon}
          </div>
        )}
      </div>
      {helperText && !error && (
        <p className="mt-1 text-sm text-text-secondary">{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;