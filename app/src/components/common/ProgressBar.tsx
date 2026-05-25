import React from 'react';
import clsx from 'clsx';

export interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  label?: string;
}

const sizeClasses = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

const variantClasses = {
  primary: 'bg-gradient-to-r from-primary-500 to-primary-600',
  success: 'bg-gradient-to-r from-success-500 to-success-600',
  warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
  danger: 'bg-gradient-to-r from-danger-500 to-danger-600',
};

/**
 * ProgressBar Component
 * Barra de progreso con gradiente y animación opcional
 * 
 * @example
 * <ProgressBar value={75} max={100} label="Progreso" />
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  showLabel = true,
  animated = true,
  size = 'md',
  variant = 'primary',
  label,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="w-full">
      {/* Label */}
      {(label || showLabel) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showLabel && (
            <span className="text-sm font-semibold text-gray-600">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      {/* Bar Container */}
      <div className={clsx(
        'w-full bg-gray-200 rounded-full overflow-hidden',
        sizeClasses[size]
      )}>
        {/* Bar Fill */}
        <div
          className={clsx(
            variantClasses[variant],
            'h-full transition-all duration-500 ease-out rounded-full',
            animated && 'motion-safe:animate-pulse'
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={Math.round(percentage)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
