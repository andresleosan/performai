import React, { useState } from 'react';
import { Card, CardBody, Button, Badge, Table, Modal, Input } from '@/components/common';
import { AppLayout } from '@/components/layout';
import { useAuth } from '@/contexts/AuthContext';

export const ConfigTiposPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [newType, setNewType] = useState('');

  const fixedTypes = [
    { id: 1, nombre: 'Gerente', descripcion: 'Posición de liderazgo', estado: 'Fijo' },
    { id: 2, nombre: 'Especialista', descripcion: 'Experto técnico', estado: 'Fijo' },
    { id: 3, nombre: 'Analista', descripcion: 'Análisis de datos', estado: 'Fijo' },
  ];

  const customTypes = [
    { id: 4, nombre: 'Coordinador', descripcion: 'Coordinación de proyectos', estado: 'Custom' },
    { id: 5, nombre: 'Asesor', descripcion: 'Consultoría interna', estado: 'Custom' },
  ];

  return (
    <AppLayout user={user} onLogout={logout}>
      <div className="px-4 py-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary-700">Configuración de Tipos</h1>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            + Nuevo Tipo
          </Button>
        </div>

        {/* Fixed Types */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-primary-700 mb-4">Tipos Predefinidos</h2>
          <Card>
            <CardBody>
              <Table
                columns={[
                  { key: 'nombre', label: 'Nombre' },
                  { key: 'descripcion', label: 'Descripción' },
                  {
                    key: 'estado',
                    label: 'Estado',
                    render: (value: string) => (
                      <Badge color={value === 'Fijo' ? 'gray' : 'purple'}>{value}</Badge>
                    ),
                  },
                ]}
                data={fixedTypes}
              />
            </CardBody>
          </Card>
        </div>

        {/* Custom Types */}
        <div>
          <h2 className="text-xl font-bold text-primary-700 mb-4">Tipos Personalizados</h2>
          <Card>
            <CardBody>
              <Table
                columns={[
                  { key: 'nombre', label: 'Nombre' },
                  { key: 'descripcion', label: 'Descripción' },
                  {
                    key: 'estado',
                    label: 'Acciones',
                    render: (_val: string) => (
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm">
                          Editar
                        </Button>
                        <Button variant="danger" size="sm">
                          Eliminar
                        </Button>
                      </div>
                    ),
                  },
                ]}
                data={customTypes}
              />
            </CardBody>
          </Card>
        </div>

        {/* Modal for new type */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Nuevo Tipo" size="md">
          <div className="space-y-4">
            <Input
              label="Nombre del tipo"
              placeholder="Ej: Coordinador"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              fullWidth
            />
            <Input
              label="Descripción"
              placeholder="Describe el rol..."
              fullWidth
            />
            <div className="flex gap-3">
              <Button variant="secondary" fullWidth onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" fullWidth>
                Guardar
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </AppLayout>
  );
};

export default ConfigTiposPage;
