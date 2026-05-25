import React from 'react';
import type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps } from '@/types';
import clsx from 'clsx';

/**
 * Card Component - Container wrapper
 */
export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={clsx('bg-white rounded-lg shadow-md overflow-hidden', className)}>
      {children}
    </div>
  );
};

/**
 * Card Header Component
 */
export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  return (
    <div className={clsx('bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-4', className)}>
      {children}
    </div>
  );
};

/**
 * Card Body Component
 */
export const CardBody: React.FC<CardBodyProps> = ({ children, className }) => {
  return (
    <div className={clsx('p-6', className)}>
      {children}
    </div>
  );
};

/**
 * Card Footer Component
 */
export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
  return (
    <div className={clsx('border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end gap-3', className)}>
      {children}
    </div>
  );
};

/**
 * Composed Card Component
 * @example
 * <Card>
 *   <CardHeader>Title</CardHeader>
 *   <CardBody>Content</CardBody>
 *   <CardFooter>Action</CardFooter>
 * </Card>
 */
export default Card;
