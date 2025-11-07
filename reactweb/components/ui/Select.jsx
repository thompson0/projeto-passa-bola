import React from 'react';

const Select = ({
  id, 
  value,
  onChange,
  options = [],
  className = '',
  placeholder = 'Selecione...',
  error,
  helperText
}) => {
  return (
    <div className="space-y-2 w-full">
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`
            bg-background border border-gray-700 rounded-md py-2 px-3 text-sm text-white
            focus:outline-none focus:ring-2 focus:ring-primary
            ${error ? 'border-red focus:ring-red/30' : ''}
            ${className}
          `}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="w-5 h-5 text-text-secondary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      {helperText && !error && (
        <p className="mt-1 text-sm text-text-secondary">{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red">{error}</p>
      )}
    </div>
  );
};

export default Select;