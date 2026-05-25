import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Input, Card, CardBody } from '@/components/common';

/**
 * Login Page
 * Página de autenticación
 */
export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-secondary-500 to-primary-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardBody>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-secondary-700">PerformAI</h1>
              <p className="text-gray-600 mt-2">
                Plataforma de Evaluación 180°
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                fullWidth
              />

              <Input
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                fullWidth
              />

              {error && (
                <div className="p-3 bg-danger-50 border border-danger-500 rounded-md text-danger-700 text-sm">
                  {error}
                </div>
              )}

              <Button
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
              <p>
                Demo: Usa cualquier email y contraseña para entrar
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
