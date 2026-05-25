import React from 'react';

export interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

/**
 * AuthLayout Component
 * Layout para páginas de autenticación (login, register)
 * 
 * @example
 * <AuthLayout title="Iniciar Sesión">
 *   <LoginForm />
 * </AuthLayout>
 */
export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title = 'PerformAI',
  subtitle = 'Plataforma de Evaluación 180°',
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
          <p className="text-white/80">{subtitle}</p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          {children}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white/60 text-sm">
          <p>&copy; 2025 PerformAI. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
