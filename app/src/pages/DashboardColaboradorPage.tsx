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
        <h1 className="text-3xl font-bold text-secondary-500 mb-8">Mi Desempeño</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('reportes')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'reportes'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Mis Reportes
          </button>
          <button
            onClick={() => setActiveTab('historial')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'historial'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-900'
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
