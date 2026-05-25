import React from 'react';
import type { ButtonProps } from '@/types';
import clsx from 'clsx';

/**
 * Button Component
 * Componente base reutilizable con múltiples variantes
 * 
 * @example
 * <Button variant="primary" size="md">Click me</Button>
 * <Button variant="secondary" disabled>Disabled</Button>
 * <Button fullWidth>Full Width Button</Button>
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  className,
  children,
  ...props
}) => {
  // Variant styles
  const variantStyles = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700',
    success: 'bg-success-500 text-white hover:bg-success-600 active:bg-success-700',
    danger: 'bg-danger-500 text-white hover:bg-danger-600 active:bg-danger-700',
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1 text-sm min-h-8',
    md: 'px-4 py-2 text-base min-h-10',
    lg: 'px-6 py-3 text-lg min-h-12',
  };

  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed';

  const fullWidthStyle = fullWidth ? 'w-full' : '';

  const buttonClass = clsx(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidthStyle,
    className,
    {
      'opacity-70 cursor-not-allowed': disabled || isLoading,
    }
  );

  return (
    <button
      className={buttonClass}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="mr-2 h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
};

export default Button;
