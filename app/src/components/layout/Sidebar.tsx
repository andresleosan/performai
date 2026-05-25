import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import clsx from 'clsx';

/**
 * Sidebar Component
 * Menú de navegación lateral con todos los dashboards y secciones
 */
export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    {
      label: 'Dashboard Admin',
      path: '/dashboard/admin',
      icon: '📊',
    },
    {
      label: 'Dashboard Líder',
      path: '/dashboard/lider',
      icon: '👔',
    },
    {
      label: 'Mi Desempeño',
      path: '/dashboard/colaborador',
      icon: '👤',
    },
    {
      label: 'Evaluación',
      path: '/evaluacion',
      icon: '📝',
    },
    {
      label: 'Configurar Tipos',
      path: '/config/tipos',
      icon: '⚙️',
    },
    {
      label: 'Banco de Preguntas',
      path: '/config/preguntas',
      icon: '❓',
    },
    {
      label: 'Reporte',
      path: '/reportes/123',
      icon: '📈',
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed left-0 top-16 h-[calc(100vh-64px)] bg-white border-r-2 border-primary-100 shadow-sm transition-all duration-300 z-40',
          isOpen ? 'w-64' : 'w-20'
        )}
      >
        <div className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={clsx(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left group',
                isActive(item.path)
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-primary-50'
              )}
              title={item.label}
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              {isOpen && <span className="font-medium text-sm truncate">{item.label}</span>}
            </button>
          ))}
        </div>
      </aside>

      {/* Main content wrapper adjustment */}
      <div className={clsx('transition-all duration-300', isOpen ? 'ml-64' : 'ml-20')} />

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-20 z-50 p-2 hover:bg-gray-100 rounded-lg"
        title={isOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        {isOpen ? '◀' : '▶'}
      </button>
    </>
  );
};

export default Sidebar;
