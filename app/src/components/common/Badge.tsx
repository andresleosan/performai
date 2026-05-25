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
    purple: 'bg-primary-100 text-primary-700 border border-primary-300 font-bold',
    navy: 'bg-blue-100 text-blue-800 border border-blue-300 font-bold',
    green: 'bg-emerald-100 text-emerald-700 border border-emerald-300 font-bold',
    gray: 'bg-gray-200 text-gray-800 border border-gray-300 font-bold',
    blue: 'bg-cyan-100 text-cyan-700 border border-cyan-300 font-bold',
  };

  const baseStyles = 'inline-flex items-center px-4 py-2 rounded-full text-sm font-bold min-h-7 shadow-sm';

  const badgeClass = clsx(baseStyles, colorStyles[color], className);

  return <span className={badgeClass}>{children}</span>;
};

export default Badge;
