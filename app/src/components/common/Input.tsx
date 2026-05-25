import React from 'react';
import type { InputProps } from '@/types';
import clsx from 'clsx';

/**
 * Input Component
 * Componente input reutilizable con validación y error handling
 * 
 * @example
 * <Input label="Email" type="email" error="Email is required" />
 * <Input label="Password" type="password" />
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  helpText,
  fullWidth = false,
  disabled = false,
  className,
  ...props
}) => {
  const baseStyles = 'px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500 text-base min-h-10';

  const inputClass = clsx(
    baseStyles,
    {
      'w-full': fullWidth,
      'border-danger-500 focus:ring-danger-500': error,
    },
    className
  );

  return (
    <div className={clsx('flex flex-col', { 'w-full': fullWidth })}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {props.required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        className={inputClass}
        disabled={disabled}
        {...props}
      />

      {error && (
        <p className="mt-1 text-sm text-danger-500">{error}</p>
      )}

      {helpText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
};

/**
 * Textarea Component
 */
export const Textarea: React.FC<InputProps & { rows?: number }> = ({
  label,
  error,
  helpText,
  fullWidth = false,
  disabled = false,
  rows = 4,
  className,
  ...props
}) => {
  const baseStyles = 'px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500 font-sans resize-vertical';

  const textareaClass = clsx(
    baseStyles,
    {
      'w-full': fullWidth,
      'border-danger-500 focus:ring-danger-500': error,
    },
    className
  );

  return (
    <div className={clsx('flex flex-col', { 'w-full': fullWidth })}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {props.required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}

      <textarea
        className={textareaClass}
        rows={rows}
        disabled={disabled}
        {...(props as any)}
      />

      {error && (
        <p className="mt-1 text-sm text-danger-500">{error}</p>
      )}

      {helpText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
};

export default Input;
