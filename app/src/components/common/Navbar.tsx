import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import type { User } from '@/types';

export interface NavbarProps {
  user?: User | null;
  onLogout?: () => void;
  logo?: string;
  title?: string;
}

/**
 * Navbar Component
 * Header con gradiente, información de usuario y menú responsivo
 * 
 * @example
 * <Navbar 
 *   user={currentUser}
 *   onLogout={handleLogout}
 *   title="PerformAI"
 * />
 */
export const Navbar: React.FC<NavbarProps> = ({
  user,
  onLogout,
  logo,
  title = 'PerformAI',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout?.();
    navigate('/login');
  };

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <nav className="bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            {logo && <img src={logo} alt={title} className="h-8 w-8" />}
            <h1 className="text-xl font-bold">{title}</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {user && (
              <>
                {/* User Info */}
                <div className="text-right">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-white/80">{user.role}</p>
                </div>

                {/* Avatar */}
                <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full border-2 border-white">
                  <span className="text-sm font-semibold">{initials}</span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium bg-white/20 hover:bg-white/30 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white"
                >
                  Cerrar sesión
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          {user && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Menú"
            >
              <svg
                className={clsx(
                  'w-6 h-6 transition-transform',
                  mobileMenuOpen && 'rotate-180'
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {user && mobileMenuOpen && (
        <div className="md:hidden border-t border-white/20">
          <div className="px-4 py-4 space-y-4">
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-white/80">{user.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-sm font-medium bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
