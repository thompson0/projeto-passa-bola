import React, { forwardRef } from 'react';

const Checkbox = forwardRef(({ 
  label, 
  id, 
  error,
  className = '',
  ...props 
}, ref) => {
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id={id}
          ref={ref}
          type="checkbox"
          className={`
            h-4 w-4 rounded border-border text-primary 
            focus:ring-2 focus:ring-lilac/30 focus:ring-offset-0
            ${error ? 'border-red' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      <div className="ml-2 text-sm">
        {label && (
          <label htmlFor={id} className="font-medium text-text">
            {label}
          </label>
        )}
        {error && (
          <p className="mt-1 text-sm text-red">{error}</p>
        )}
      </div>
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;