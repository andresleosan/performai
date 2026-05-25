import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

/**
 * Select Component
 * Dropdown con opciones, validación y accesibilidad
 * 
 * @example
 * <Select 
 *   options={[{ value: '1', label: 'Opción 1' }]}
 *   value={selected}
 *   onChange={setSelected}
 *   placeholder="Selecciona..."
 * />
 */
export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Selecciona una opción',
  label,
  error,
  disabled = false,
  fullWidth = true,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption?.label || placeholder;

  return (
    <div
      ref={containerRef}
      className={clsx('relative', fullWidth && 'w-full', className)}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      {/* Button */}
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={clsx(
          'w-full px-4 py-2 text-left bg-white border rounded-lg transition-colors',
          'flex items-center justify-between',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
          error
            ? 'border-danger-500 focus:ring-danger-500'
            : 'border-gray-300 hover:border-gray-400 focus:border-transparent',
          disabled && 'opacity-50 cursor-not-allowed bg-gray-50'
        )}
      >
        <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
          {displayText}
        </span>
        <svg
          className={clsx(
            'w-5 h-5 text-gray-400 transition-transform',
            isOpen && 'transform rotate-180'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>

      {/* Error Message */}
      {error && <p className="mt-1 text-sm text-danger-500">{error}</p>}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
          {options.length > 0 ? (
            options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  if (!option.disabled) {
                    onChange(option.value);
                    setIsOpen(false);
                  }
                }}
                disabled={option.disabled}
                className={clsx(
                  'w-full px-4 py-2 text-left transition-colors',
                  'focus:outline-none focus:bg-primary-50 hover:bg-gray-50',
                  value === option.value && 'bg-primary-50 text-primary-700 font-semibold',
                  option.disabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                {option.label}
              </button>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500 text-center">No hay opciones</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
