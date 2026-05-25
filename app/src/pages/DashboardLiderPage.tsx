import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardBody, Button, Badge } from '@/components/common';

export const DashboardLiderPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedEval, setSelectedEval] = useState<number | null>(null);

  const pendingEvaluations = [
    { 
      id: 1, 
      colaborador: 'Juan Pérez', 
      departamento: 'Ventas', 
      fecha: '2025-05-20', 
      estado: 'Pendiente',
      rol: 'Ejecutivo de Ventas',
      progreso: 0
    },
    { 
      id: 2, 
      colaborador: 'María García', 
      departamento: 'Marketing', 
      fecha: '2025-05-21', 
      estado: 'Pendiente',
      rol: 'Especialista Marketing',
      progreso: 0
    },
  ];

  const handleStartEvaluation = (evaluation: any) => {
    localStorage.setItem('evaluationTarget', JSON.stringify(evaluation));
    navigate('/evaluacion');
  };

  return (
    <AppLayout user={user} onLogout={logout}>
      <div className="px-4 py-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Centro de Evaluaciones
          </h1>
          <p className="text-lg text-gray-600">Gestiona las evaluaciones 360° de tu equipo</p>
        </div>

        {/* Alert Box */}
        <div className="mb-8 p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
          <div className="flex items-start gap-4">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="text-lg font-bold text-yellow-900 mb-1">Evaluaciones Pendientes</h3>
              <p className="text-yellow-800">Tienes <span className="font-bold">2 evaluaciones</span> pendientes</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="border-l-4 border-primary-500 bg-primary-50">
            <CardBody className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">2</div>
              <div className="text-gray-700">Pendientes</div>
            </CardBody>
          </Card>
          <Card className="border-l-4 border-green-500 bg-green-50">
            <CardBody className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">1</div>
              <div className="text-gray-700">Completadas</div>
            </CardBody>
          </Card>
        </div>

        {/* Evaluations */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 Evaluaciones Asignadas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pendingEvaluations.map((evaluation) => (
              <div
                key={evaluation.id}
                className="cursor-pointer"
                onClick={() => setSelectedEval(evaluation.id)}
              >
                <Card
                  className={`border-2 hover:shadow-lg transition-all ${
                    selectedEval === evaluation.id
                      ? 'border-primary-500 bg-primary-50 shadow-md'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <CardBody>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{evaluation.colaborador}</h3>
                        <p className="text-sm text-gray-600">{evaluation.rol}</p>
                      </div>
                      <Badge color="navy">{evaluation.estado}</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-y border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500 font-bold">Departamento</p>
                        <p className="text-sm font-semibold text-gray-700">{evaluation.departamento}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold">Fecha Límite</p>
                        <p className="text-sm font-semibold text-gray-700">{evaluation.fecha}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Progreso</span>
                        <span className="font-bold text-primary-600">{evaluation.progreso}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-600"
                          style={{ width: `${evaluation.progreso}%` }}
                        />
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      fullWidth
                      onClick={() => handleStartEvaluation(evaluation)}
                    >
                      Iniciar Evaluación
                    </Button>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <Card className="mt-12">
          <CardBody>
            <h3 className="text-lg font-bold text-gray-900 mb-3">📌 Instrucciones</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Selecciona un colaborador para evaluarlo</li>
              <li>✓ Contesta las 11 preguntas de la evaluación 360°</li>
              <li>✓ Proporciona justificaciones cuando sea necesario</li>
              <li>✓ Revisa tu respuesta antes de enviar</li>
            </ul>
          </CardBody>
        </Card>
      </div>
    </AppLayout>
  );
};

export default DashboardLiderPage;
