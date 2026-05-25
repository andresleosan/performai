import React from 'react';

export interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  title?: string;
}

/**
 * DashboardLayout Component
 * Layout para páginas de dashboard con sidebar opcional
 * 
 * @example
 * <DashboardLayout title="Dashboard" sidebar={<Sidebar />}>
 *   <Dashboard />
 * </DashboardLayout>
 */
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  sidebar,
  title,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar */}
      {sidebar && (
        <aside className="lg:w-64 flex-shrink-0">
          {sidebar}
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {title && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          </div>
        )}
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
