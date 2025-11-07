import React, { forwardRef } from 'react';

const FormInput = forwardRef(({ 
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
            w-full px-4 py-3 bg-white border border-border rounded-[12px] h-[48px]
            focus:outline-none focus:border-lilac focus:ring-2 focus:ring-lilac/30
            transition-all duration-200
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

FormInput.displayName = 'FormInput';

export default FormInput;