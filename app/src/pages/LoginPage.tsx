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
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleAcceptTerms = () => {
    if (acceptedTerms) {
      setShowLoginForm(true);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardBody>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-secondary-700">PerformAI</h1>
              <p className="text-gray-600 mt-2">
                Plataforma de Evaluación 180°
              </p>
            </div>

            {!showLoginForm ? (
              <>
                <div className="space-y-4">
                  <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-4">
                    <h2 className="font-semibold text-primary-700 mb-3">
                      Términos y Condiciones
                    </h2>
                    <div className="text-sm text-gray-700 space-y-2 mb-4 max-h-48 overflow-y-auto">
                      <p>
                        • Esta plataforma es para evaluaciones profesionales 180°
                      </p>
                      <p>
                        • Todos los datos serán tratados de forma confidencial
                      </p>
                      <p>
                        • Acepto que mis evaluaciones serán almacenadas en la base de datos segura
                      </p>
                      <p>
                        • Entiendo que la información será usada solo para propósitos de desarrollo profesional
                      </p>
                      <p>
                        • Los administradores tienen acceso a mis datos para análisis
                      </p>
                    </div>
                  </div>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1 w-5 h-5 text-primary-600 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">
                      Acepto los términos y condiciones de PerformAI
                    </span>
                  </label>

                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={!acceptedTerms}
                    onClick={handleAcceptTerms}
                  >
                    Aceptar y Continuar
                  </Button>

                  <div className="mt-4 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
                    <p>
                      Al continuar, aceptas nuestra política de privacidad y seguridad de datos
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setShowLoginForm(false);
                    setEmail('');
                    setPassword('');
                    setError('');
                  }}
                  className="mb-4 text-primary-600 text-sm hover:text-primary-700 flex items-center"
                >
                  ← Volver
                </button>

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

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-center text-sm text-gray-600 mb-4">
                    <strong>Credenciales de Prueba:</strong>
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-700 bg-gray-50 p-3 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">Email:</p>
                      <p className="font-mono bg-white p-2 rounded border border-gray-200 mt-1">
                        test@performai.com
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Contraseña:</p>
                      <p className="font-mono bg-white p-2 rounded border border-gray-200 mt-1">
                        test123
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Usa estas credenciales para acceder a la plataforma
                  </p>
                </div>
              </>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
