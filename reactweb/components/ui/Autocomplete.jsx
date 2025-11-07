import React, { forwardRef, useState, useEffect, useRef } from 'react';

const Autocomplete = forwardRef(({ 
  label, 
  id, 
  error, 
  helperText,
  options = [],
  onSelect,
  className = '',
  ...props 
}, ref) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    if (inputValue) {
      const filtered = options.filter(option => 
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  }, [inputValue, options]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (option) => {
    setInputValue(option.label);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <div className="space-y-2 w-full" ref={wrapperRef}>
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-text"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          ref={ref}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          className={`
            w-full px-4 py-3 bg-white border border-border rounded-[12px] h-[48px]
            focus:outline-none focus:border-lilac focus:ring-2 focus:ring-lilac/30
            transition-all duration-200
            ${error ? 'border-red focus:border-red focus:ring-red/30' : ''}
            ${className}
          `}
          {...props}
        />
        {isOpen && filteredOptions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-border rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                className="px-4 py-2 cursor-pointer hover:bg-lilac/10"
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))}
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

Autocomplete.displayName = 'Autocomplete';

export default Autocomplete;