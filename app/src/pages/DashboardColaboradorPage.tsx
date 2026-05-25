import React, { useState } from 'react';
import { Card, CardBody, Badge, Table } from '@/components/common';
import { AppLayout } from '@/components/layout';
import { useAuth } from '@/contexts/AuthContext';

export const DashboardColaboradorPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'reportes' | 'historial'>('reportes');

  const reports = [
    {
      id: 1,
      fecha: '2025-05-15',
      evaluador: 'Carlos López',
      puntuacion: '4.3/5',
      estado: 'Completado',
    },
    {
      id: 2,
      fecha: '2025-04-10',
      evaluador: 'María García',
      puntuacion: '4.1/5',
      estado: 'Completado',
    },
  ];

  const history = [
    { id: 1, fecha: '2025-05-20', evento: 'Iniciaste evaluación', detalles: 'Evaluación 180°' },
    { id: 2, fecha: '2025-05-15', evento: 'Completaste evaluación', detalles: 'Evaluación 180°' },
    { id: 3, fecha: '2025-05-10', evento: 'Recibiste reporte', detalles: 'Reporte de evaluación' },
  ];

  return (
    <AppLayout user={user} onLogout={logout}>
      <div className="px-4 py-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary-700 mb-2">Mi Desempeño</h1>
          <p className="text-base text-gray-600">Visualiza tus evaluaciones y progreso</p>
        </div>

        {/* Alert de Evaluaciones Pendientes */}
        <div className="mb-8 p-4 bg-primary-50 border-l-4 border-primary-500 rounded-lg shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="text-lg font-bold text-primary-700">Evaluaciones Pendientes</h3>
              <p className="text-sm text-gray-700 font-medium">Tienes 2 evaluaciones pendientes por completar.</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b-2 border-gray-200">
          <button
            onClick={() => setActiveTab('reportes')}
            className={`px-6 py-3 font-semibold text-base transition-all duration-200 ${
              activeTab === 'reportes'
                ? 'text-white bg-primary-600 border-b-3 border-primary-700 rounded-t-lg'
                : 'text-gray-600 hover:text-primary-500'
            }`}
          >
            Mis Reportes
          </button>
          <button
            onClick={() => setActiveTab('historial')}
            className={`px-6 py-3 font-semibold text-base transition-all duration-200 ${
              activeTab === 'historial'
                ? 'text-white bg-primary-600 border-b-3 border-primary-700 rounded-t-lg'
                : 'text-gray-600 hover:text-primary-500'
            }`}
          >
            Historial
          </button>
        </div>

        {/* Reportes Tab */}
        {activeTab === 'reportes' && (
          <Card>
            <CardBody>
              <Table
                columns={[
                  { key: 'fecha', label: 'Fecha' },
                  { key: 'evaluador', label: 'Evaluador' },
                  { key: 'puntuacion', label: 'Puntuación' },
                  {
                    key: 'estado',
                    label: 'Estado',
                    render: (val: string) => (
                      <Badge color={val === 'Completado' ? 'green' : 'purple'}>{val}</Badge>
                    ),
                  },
                ]}
                data={reports}
              />
            </CardBody>
          </Card>
        )}

        {/* Historial Tab */}
        {activeTab === 'historial' && (
          <div className="space-y-3">
            {history.map((item) => (
              <Card key={item.id}>
                <CardBody className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">{item.evento}</p>
                    <p className="text-sm text-gray-600">{item.detalles}</p>
                  </div>
                  <p className="text-sm text-gray-500">{item.fecha}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default DashboardColaboradorPage;
