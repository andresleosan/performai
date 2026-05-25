import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { EvaluationProvider } from '@/contexts/EvaluationContext';
import { LoginPage } from '@/pages/LoginPage';

/**
 * ProtectedRoute Component
 * Envolvedor para rutas protegidas
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('user');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

/**
 * App Component
 * Componente raíz de la aplicación
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <EvaluationProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            {/* Dashboard - Protegida */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <div className="p-8 text-center">
                    <h1 className="text-4xl font-bold text-primary-600 mb-4">
                      Dashboard
                    </h1>
                    <p className="text-gray-600">Página de dashboard - En desarrollo</p>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Evaluación - Protegida */}
            <Route
              path="/evaluacion"
              element={
                <ProtectedRoute>
                  <div className="p-8 text-center">
                    <h1 className="text-4xl font-bold text-primary-600 mb-4">
                      Formulario de Evaluación
                    </h1>
                    <p className="text-gray-600">Página de evaluación - En desarrollo</p>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Root redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* 404 */}
            <Route
              path="*"
              element={
                <div className="p-8 text-center">
                  <h1 className="text-4xl font-bold text-danger-600 mb-4">
                    404
                  </h1>
                  <p className="text-gray-600">Página no encontrada</p>
                </div>
              }
            />
          </Routes>
        </EvaluationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
