import React, { useState } from 'react';
import { Card, CardBody, Button, Badge, Table, Modal, Input, Select } from '@/components/common';
import { AppLayout } from '@/components/layout';
import { useAuth } from '@/contexts/AuthContext';

export const EditorPreguntasPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [filterType, setFilterType] = useState('todos');

  const questions = [
    {
      id: 1,
      pregunta: '¿Cumples con los objetivos fijados?',
      tipo: 'Escala',
      categoria: 'Desempeño',
      estado: 'Activo',
    },
    {
      id: 2,
      pregunta: '¿Trabajas en equipo de manera efectiva?',
      tipo: 'Escala',
      categoria: 'Colaboración',
      estado: 'Activo',
    },
    {
      id: 3,
      pregunta: '¿Demuestras iniciativa en tus tareas?',
      tipo: 'Escala',
      categoria: 'Iniciativa',
      estado: 'Activo',
    },
  ];

  return (
    <AppLayout user={user} onLogout={logout}>
      <div className="px-4 py-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-500">Editor de Preguntas</h1>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            + Nueva Pregunta
          </Button>
        </div>

        {/* Filter */}
        <div className="mb-8">
          <Select
            options={[
              { value: 'todos', label: 'Todas las preguntas' },
              { value: 'escala', label: 'Solo Escala' },
              { value: 'multiplechoice', label: 'Opción múltiple' },
              { value: 'texto', label: 'Texto abierto' },
            ]}
            value={filterType}
            onChange={(val) => setFilterType(String(val))}
            placeholder="Filtrar por tipo..."
            fullWidth
          />
        </div>

        {/* Questions Table */}
        <Card>
          <CardBody>
            <Table
              columns={[
                { key: 'pregunta', label: 'Pregunta', width: '40%' },
                { key: 'tipo', label: 'Tipo' },
                { key: 'categoria', label: 'Categoría' },
                {
                  key: 'estado',
                  label: 'Estado',
                  render: (val: string) => (
                    <Badge color={val === 'Activo' ? 'green' : 'gray'}>{val}</Badge>
                  ),
                },
                {
                  key: 'acciones',
                  label: 'Acciones',
                  render: () => (
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
              data={questions}
            />
          </CardBody>
        </Card>

        {/* Modal for new question */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Nueva Pregunta" size="lg">
          <div className="space-y-4">
            <Input label="Pregunta" placeholder="Ingresa la pregunta..." fullWidth />
            <Select
              label="Tipo"
              options={[
                { value: 'escala', label: 'Escala 1-5' },
                { value: 'multiplechoice', label: 'Opción múltiple' },
                { value: 'texto', label: 'Texto abierto' },
              ]}
              onChange={() => {}}
              fullWidth
            />
            <Select
              label="Categoría"
              options={[
                { value: 'desempeño', label: 'Desempeño' },
                { value: 'colaboración', label: 'Colaboración' },
                { value: 'liderazgo', label: 'Liderazgo' },
              ]}
              onChange={() => {}}
              fullWidth
            />
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 accent-primary-500" />
              <span>Estado Activo</span>
            </label>
            <div className="flex gap-3">
              <Button variant="secondary" fullWidth onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" fullWidth>
                Crear
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </AppLayout>
  );
};

export default EditorPreguntasPage;
