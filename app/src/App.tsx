import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { EvaluationProvider } from '@/contexts/EvaluationContext';

const LoginPage = lazy(() => import('@/pages/LoginPage').then((module) => ({ default: module.LoginPage })));
const DashboardAdminPage = lazy(() => import('@/pages/DashboardAdminPage').then((module) => ({ default: module.DashboardAdminPage })));
const DashboardLiderPage = lazy(() => import('@/pages/DashboardLiderPage').then((module) => ({ default: module.DashboardLiderPage })));
const DashboardColaboradorPage = lazy(() => import('@/pages/DashboardColaboradorPage').then((module) => ({ default: module.DashboardColaboradorPage })));
const EvaluacionFormularioPage = lazy(() => import('@/pages/EvaluacionFormularioPage').then((module) => ({ default: module.EvaluacionFormularioPage })));
const ConfigTiposPage = lazy(() => import('@/pages/ConfigTiposPage').then((module) => ({ default: module.ConfigTiposPage })));
const EditorPreguntasPage = lazy(() => import('@/pages/EditorPreguntasPage').then((module) => ({ default: module.EditorPreguntasPage })));
const ReporteEvaluacionPage = lazy(() => import('@/pages/ReporteEvaluacionPage').then((module) => ({ default: module.ReporteEvaluacionPage })));

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
 * Componente raíz de la aplicación con routing
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <EvaluationProvider>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600">
                Cargando aplicación...
              </div>
            }
          >
            <Routes>
              {/* Login */}
              <Route path="/login" element={<LoginPage />} />

              {/* Admin Dashboard */}
              <Route
                path="/dashboard/admin"
                element={
                  <ProtectedRoute>
                    <DashboardAdminPage />
                  </ProtectedRoute>
                }
              />

              {/* Líder Dashboard */}
              <Route
                path="/dashboard/lider"
                element={
                  <ProtectedRoute>
                    <DashboardLiderPage />
                  </ProtectedRoute>
                }
              />

              {/* Colaborador Dashboard */}
              <Route
                path="/dashboard/colaborador"
                element={
                  <ProtectedRoute>
                    <DashboardColaboradorPage />
                  </ProtectedRoute>
                }
              />

              {/* Default Dashboard - Redirect to colaborador */}
              <Route
                path="/dashboard"
                element={<Navigate to="/dashboard/colaborador" replace />}
              />

              {/* Evaluación Form */}
              <Route
                path="/evaluacion"
                element={
                  <ProtectedRoute>
                    <EvaluacionFormularioPage />
                  </ProtectedRoute>
                }
              />

              {/* Configuration Pages */}
              <Route
                path="/config/tipos"
                element={
                  <ProtectedRoute>
                    <ConfigTiposPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/config/preguntas"
                element={
                  <ProtectedRoute>
                    <EditorPreguntasPage />
                  </ProtectedRoute>
                }
              />

              {/* Reports */}
              <Route
                path="/reportes/:id"
                element={
                  <ProtectedRoute>
                    <ReporteEvaluacionPage />
                  </ProtectedRoute>
                }
              />

              {/* Root redirect */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

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
          </Suspense>
        </EvaluationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
