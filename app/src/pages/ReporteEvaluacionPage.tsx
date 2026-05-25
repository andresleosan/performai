import React from 'react';
import { Card, CardBody, CardHeader, Badge, Button } from '@/components/common';
import { AppLayout } from '@/components/layout';
import { useAuth } from '@/contexts/AuthContext';

export const ReporteEvaluacionPage: React.FC = () => {
  const { user, logout } = useAuth();

  const reportData = {
    colaborador: 'Juan Pérez García',
    evaluador: 'Carlos López',
    fecha: '2025-05-15',
    departamento: 'Ventas',
    puntuacionLider: 4.3,
    puntuacionAuto: 4.1,
    coincidencia: 94,
    desviacion: 0.2,
  };

  const fortalezas = [
    { titulo: 'Orientación a resultados', descripcion: 'Demuestra fuerte compromiso con los objetivos del equipo.' },
    { titulo: 'Trabajo en equipo', descripcion: 'Colabora efectivamente con colegas en proyectos complejos.' },
    { titulo: 'Comunicación clara', descripcion: 'Expresa ideas de forma precisa y profesional.' },
  ];

  const mejora = [
    { titulo: 'Gestión del tiempo', descripcion: 'Necesita mejorar la planificación de proyectos a largo plazo.' },
    { titulo: 'Iniciativa', descripcion: 'Podría proponer más soluciones innovadoras de forma independiente.' },
  ];

  const recomendaciones = [
    'Participar en programa de liderazgo avanzado para potenciar habilidades gerenciales',
    'Asignación a proyectos estratégicos que requieran toma de decisiones',
    'Mentoría con ejecutivo senior para desarrollo profesional',
    'Evaluación de desempeño en 6 meses para medir avances',
  ];

  return (
    <AppLayout user={user} onLogout={logout}>
      <div className="px-4 py-8 max-w-4xl mx-auto">
        {/* Header */}
        <Card className="mb-8">
          <CardHeader>{reportData.colaborador}</CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Evaluador</p>
                <p className="text-lg font-semibold text-gray-900">{reportData.evaluador}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Fecha</p>
                <p className="text-lg font-semibold text-gray-900">{reportData.fecha}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Departamento</p>
                <p className="text-lg font-semibold text-gray-900">{reportData.departamento}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Estado</p>
                <Badge color="green">Completado</Badge>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardBody className="text-center">
              <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Evaluación Líder</p>
              <p className="text-3xl font-bold text-primary-600">{reportData.puntuacionLider}</p>
              <p className="text-xs text-gray-400">/5</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center">
              <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Autoevaluación</p>
              <p className="text-3xl font-bold text-primary-600">{reportData.puntuacionAuto}</p>
              <p className="text-xs text-gray-400">/5</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center">
              <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Coincidencia</p>
              <p className="text-3xl font-bold text-success-600">{reportData.coincidencia}%</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center">
              <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Desviación</p>
              <p className="text-3xl font-bold text-danger-600">±{reportData.desviacion}</p>
            </CardBody>
          </Card>
        </div>

        {/* Fortalezas */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary-700 mb-4">Fortalezas</h2>
          <div className="space-y-3">
            {fortalezas.map((f, idx) => (
              <Card key={idx} className="border-l-4 border-success-500 bg-success-50">
                <CardBody>
                  <h3 className="font-semibold text-gray-900 mb-1">{f.titulo}</h3>
                  <p className="text-sm text-gray-600">{f.descripcion}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Áreas de Mejora */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary-700 mb-4">Áreas de Mejora</h2>
          <div className="space-y-3">
            {mejora.map((m, idx) => (
              <Card key={idx} className="border-l-4 border-danger-500 bg-danger-50">
                <CardBody>
                  <h3 className="font-semibold text-gray-900 mb-1">{m.titulo}</h3>
                  <p className="text-sm text-gray-600">{m.descripcion}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Recomendaciones */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary-700 mb-4">Recomendaciones</h2>
          <Card>
            <CardBody>
              <ol className="space-y-3">
                {recomendaciones.map((rec, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="font-semibold text-primary-600 flex-shrink-0">{idx + 1}.</span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ol>
            </CardBody>
          </Card>
        </div>

        {/* Guía 1:1 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary-700 mb-4">Guía para Reunión 1:1</h2>
          <Card>
            <CardBody>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Puntos de Discusión</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>Revisar fortalezas y reconocer desempeño</li>
                    <li>Discutir áreas de mejora de forma constructiva</li>
                    <li>Definir plan de desarrollo personalizado</li>
                    <li>Establecer metas específicas para próximo período</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Próximos Pasos</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>Crear plan de desarrollo en colaboración</li>
                    <li>Asignar mentor si es necesario</li>
                    <li>Programar seguimiento en 3 meses</li>
                    <li>Documentar acuerdos en el sistema</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="secondary" fullWidth>
            Descargar PDF
          </Button>
          <Button variant="primary" fullWidth>
            Enviar al Colaborador
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default ReporteEvaluacionPage;
