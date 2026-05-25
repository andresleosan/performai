import React from 'react';
import { Card, CardBody, Button, Badge, Table } from '@/components/common';
import { AppLayout } from '@/components/layout';
import { useAuth } from '@/contexts/AuthContext';

export const DashboardLiderPage: React.FC = () => {
  const { user, logout } = useAuth();

  const pendingEvaluations = [
    { id: 1, colaborador: 'Juan Pérez', departamento: 'Ventas', fecha: '2025-05-20', estado: 'Pendiente' },
    { id: 2, colaborador: 'María García', departamento: 'Operaciones', fecha: '2025-05-21', estado: 'Pendiente' },
  ];

  return (
    <AppLayout user={user} onLogout={logout}>
      <div className="px-4 py-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-secondary-500 mb-8">Dashboard Líder</h1>

        {/* Alert Box */}
        <Card className="mb-8 border-l-4 border-danger-500 bg-danger-50">
          <CardBody>
            <h3 className="font-semibold text-danger-600 mb-2">⚠️ Evaluaciones Pendientes</h3>
            <p className="text-gray-700">Tienes 2 evaluaciones pendientes por completar.</p>
          </CardBody>
        </Card>

        {/* Pending Evaluations */}
        <Card className="mb-8">
          <CardBody>
            <h2 className="text-xl font-bold text-secondary-500 mb-4">Evaluaciones Pendientes</h2>
            <Table
              columns={[
                { key: 'colaborador', label: 'Colaborador' },
                { key: 'departamento', label: 'Departamento' },
                { key: 'fecha', label: 'Fecha Límite' },
                { key: 'estado', label: 'Estado', render: (val: string) => <Badge color="purple">{val}</Badge> },
              ]}
              data={pendingEvaluations}
            />
          </CardBody>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button variant="primary" fullWidth>
            Iniciar Evaluación
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default DashboardLiderPage;
