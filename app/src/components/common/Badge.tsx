import React from 'react';
import type { BadgeProps } from '@/types';
import clsx from 'clsx';

/**
 * Badge Component
 * Etiqueta pequeña reutilizable para estados, categorías, etc
 * 
 * @example
 * <Badge color="purple">Activo</Badge>
 * <Badge color="green">Completado</Badge>
 */
export const Badge: React.FC<BadgeProps> = ({ children, color = 'purple', className }) => {
  const colorStyles = {
    purple: 'bg-primary-100 text-primary-700',
    navy: 'bg-secondary-100 text-secondary-700',
    green: 'bg-success-100 text-success-700',
    gray: 'bg-gray-100 text-gray-700',
  };

  const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold min-h-6';

  const badgeClass = clsx(baseStyles, colorStyles[color], className);

  return <span className={badgeClass}>{children}</span>;
};

export default Badge;
