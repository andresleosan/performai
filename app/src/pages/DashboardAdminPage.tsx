import React from 'react';
import { Card, CardBody, Button, Badge, Table } from '@/components/common';
import { AppLayout } from '@/components/layout';
import { useAuth } from '@/contexts/AuthContext';

/**
 * DashboardAdminPage
 * Dashboard administrativo con estadísticas y acciones
 */
export const DashboardAdminPage: React.FC = () => {
  const { user, logout } = useAuth();

  // Mock data for stats
  const stats = [
    { number: 42, label: 'Evaluaciones Completas' },
    { number: 8, label: 'Evaluaciones Pendientes' },
    { number: 24, label: 'Usuarios Activos' },
    { number: '94%', label: 'Tasa de Respuesta' },
  ];

  // Mock data for actions
  const actions = [
    { icon: '👤', title: 'Crear Usuario', description: 'Agregar nuevo usuario al sistema' },
    { icon: '⚙️', title: 'Configurar Tipos', description: 'Gestionar tipos de colaboradores' },
    { icon: '📊', title: 'Ver Reportes', description: 'Análisis de evaluaciones completas' },
    { icon: '👥', title: 'Gestionar Usuarios', description: 'Administrar usuarios existentes' },
  ];

  // Mock data for activity table
  const activityColumns = [
    { key: 'usuario', label: 'Usuario' },
    { key: 'accion', label: 'Acción' },
    { key: 'fecha', label: 'Fecha' },
    { key: 'estado', label: 'Estado' },
  ];

  const activityData = [
    {
      usuario: 'Juan Pérez',
      accion: 'Completó evaluación',
      fecha: '2025-05-24 14:30',
      estado: 'Completado',
    },
    {
      usuario: 'María García',
      accion: 'Iniciló evaluación',
      fecha: '2025-05-24 13:15',
      estado: 'En Progreso',
    },
    {
      usuario: 'Carlos López',
      accion: 'Completó evaluación',
      fecha: '2025-05-24 12:00',
      estado: 'Completado',
    },
  ];

  return (
    <AppLayout user={user} onLogout={logout}>
      <div className="px-4 py-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-secondary-500 mb-8">Dashboard Administrativo</h1>

        {/* Stats Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-secondary-500 mb-6">Resumen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <Card key={idx}>
                <CardBody className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-500 uppercase font-semibold">{stat.label}</div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Actions Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-secondary-500 mb-6">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {actions.map((action, idx) => (
              <Card key={idx} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardBody className="text-center">
                  <div className="text-4xl mb-4">{action.icon}</div>
                  <h3 className="font-semibold text-secondary-500 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Activity Table */}
        <div>
          <h2 className="text-2xl font-bold text-secondary-500 mb-6">Actividad Reciente</h2>
          <Card>
            <CardBody>
              <Table
                columns={activityColumns.map((col) => ({
                  ...col,
                  render:
                    col.key === 'estado'
                      ? (value: string) => (
                          <Badge color={value === 'Completado' ? 'green' : value === 'En Progreso' ? 'purple' : 'gray'}>
                            {value}
                          </Badge>
                        )
                      : undefined,
                }))}
                data={activityData}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default DashboardAdminPage;
