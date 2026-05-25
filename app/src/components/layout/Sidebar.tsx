import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import clsx from 'clsx';

/**
 * Sidebar Component
 * Menú de navegación lateral con todos los dashboards y secciones
 */
export interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard Admin', path: '/dashboard/admin', icon: '📊' },
    { label: 'Dashboard Líder', path: '/dashboard/lider', icon: '👔' },
    { label: 'Mi Desempeño', path: '/dashboard/colaborador', icon: '👤' },
    { label: 'Evaluación', path: '/evaluacion', icon: '📝' },
    { label: 'Configurar Tipos', path: '/config/tipos', icon: '⚙️' },
    { label: 'Banco de Preguntas', path: '/config/preguntas', icon: '❓' },
    { label: 'Reporte', path: '/reportes/123', icon: '📈' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={clsx(
        'fixed left-0 top-16 h-[calc(100vh-64px)] bg-white border-r-2 border-primary-100 shadow-sm transition-all duration-300 z-40 overflow-hidden',
        isOpen ? 'w-64' : 'w-20'
      )}
    >
      <div className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            aria-current={isActive(item.path) ? 'page' : undefined}
            aria-label={item.label}
            className={clsx(
              'relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left group',
              isActive(item.path)
                ? 'bg-primary-100 text-primary-900 focus:outline-none focus:ring-0'
                : 'text-gray-700 border border-transparent hover:bg-primary-50 hover:border-primary-100 hover:text-primary-700 focus:outline-none focus:ring-0'
            )}
          >
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            {isOpen && (
              <span className={clsx('font-semibold text-sm truncate', isActive(item.path) && 'text-primary-900')}>
                {item.label}
              </span>
            )}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
