import React from 'react';
import { Navbar } from '@/components/common';
import type { User } from '@/types';

export interface AppLayoutProps {
  children: React.ReactNode;
  user?: User | null;
  onLogout?: () => void;
}

/**
 * AppLayout Component
 * Layout principal con navbar y contenido
 * 
 * @example
 * <AppLayout user={user} onLogout={logout}>
 *   <YourPage />
 * </AppLayout>
 */
export const AppLayout: React.FC<AppLayoutProps> = ({ children, user, onLogout }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar user={user} onLogout={onLogout} />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
