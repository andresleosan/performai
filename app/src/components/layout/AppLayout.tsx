import React from 'react';
import { Navbar } from '@/components/common';
import { Sidebar } from './Sidebar';
import type { User } from '@/types';

export interface AppLayoutProps {
  children: React.ReactNode;
  user?: User | null;
  onLogout?: () => void;
}

/**
 * AppLayout Component
 * Layout principal con navbar, sidebar y contenido
 * 
 * @example
 * <AppLayout user={user} onLogout={logout}>
 *   <YourPage />
 * </AppLayout>
 */
export const AppLayout: React.FC<AppLayoutProps> = ({ children, user, onLogout }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-800">
      <Navbar user={user} onLogout={onLogout} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 ml-64 pt-4 px-6 overflow-auto bg-slate-800 text-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
