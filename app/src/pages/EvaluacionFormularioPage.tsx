import React, { useState } from 'react';
import { Card, CardBody, Button, ProgressBar, Slider } from '@/components/common';
import { AppLayout } from '@/components/layout';
import { useAuth } from '@/contexts/AuthContext';
import { useEvaluation } from '@/contexts/EvaluationContext';

/**
 * EvaluacionFormularioPage
 * Formulario de evaluación 180° con escala 1-5
 */
export const EvaluacionFormularioPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { currentQuestionIndex, saveAnswer } = useEvaluation();
  const [justification, setJustification] = useState('');
  const [notApplicable, setNotApplicable] = useState(false);

  // Mock questions
  const questions = Array.from({ length: 11 }, (_, i) => ({
    id: `q${i + 1}`,
    text: `Pregunta ${i + 1}: Valora este aspecto de tu desempeño`,
    type: 'escala',
  }));

  const currentQuestion = questions[currentQuestionIndex] || questions[0];
  const answered = currentQuestionIndex + 1; // Mock: 3 questions answered
  const progress = (answered / questions.length) * 100;

  const handleNext = () => {
    saveAnswer(currentQuestion.id, { questionId: currentQuestion.id, value: 3, justification });
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      handleNext();
    }
  };

  const handleSubmit = () => {
    saveAnswer(currentQuestion.id, { questionId: currentQuestion.id, value: 3, justification });
    alert('Evaluación completada');
  };

  return (
    <AppLayout user={user} onLogout={logout}>
      <div className="px-4 py-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-secondary-500 mb-8">Evaluación 180°</h1>

        {/* Progress Section */}
        <Card className="mb-8">
          <CardBody>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Progreso</span>
                <span className="font-semibold text-primary-600">{Math.round(progress)}%</span>
              </div>
              <ProgressBar value={answered} max={questions.length} showLabel={false} />
              <p className="text-xs text-gray-500 text-center">
                Pregunta {currentQuestionIndex + 1} de {questions.length}
              </p>
            </div>
          </CardBody>
        </Card>

        {/* Question Navigator */}
        <Card className="mb-8">
          <CardBody>
            <p className="text-xs font-semibold text-gray-600 uppercase mb-4">Navegador de preguntas</p>
            <div className="grid grid-cols-11 gap-2">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  className={`
                    w-full aspect-square rounded-full font-semibold transition-all
                    focus:outline-none focus:ring-2 focus:ring-primary-500
                    ${
                      idx === currentQuestionIndex
                        ? 'bg-primary-500 text-white shadow-lg scale-110'
                        : idx < answered
                          ? 'bg-success-500 text-white'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }
                  `}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Question Card */}
        <Card className="mb-8">
          <CardBody>
            {/* Question Header */}
            <div className="mb-6 pb-4 border-b-2 border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Pregunta {currentQuestionIndex + 1}</p>
              <h2 className="text-2xl font-bold text-secondary-500">{currentQuestion.text}</h2>
              <p className="text-xs text-gray-500 mt-2">Tipo: Escala de 1-5</p>
            </div>

            {/* Scale 1-5 */}
            <div className="mb-8">
              <label className="block font-semibold text-secondary-500 mb-4">
                Escala de evaluación
              </label>
              <Slider
                value={3}
                onChange={() => {}}
                labels={['Totalmente desacuerdo', '', '', '', 'Totalmente de acuerdo']}
                disabled={notApplicable}
              />
            </div>

            {/* Not Applicable Checkbox */}
            <div className="mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notApplicable}
                  onChange={(e) => setNotApplicable(e.target.checked)}
                  className="w-5 h-5 accent-primary-500 cursor-pointer"
                />
                <span className="text-gray-700">No aplica para mi rol</span>
              </label>
            </div>

            {/* Justification */}
            <div className="mb-6">
              <label className="block font-semibold text-secondary-500 mb-2">
                Justificación (opcional)
              </label>
              <textarea
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                placeholder="Proporciona detalles sobre tu respuesta..."
                className="w-full min-h-24 px-4 py-3 border border-gray-300 rounded-lg font-sans focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                fullWidth
              >
                ← Anterior
              </Button>
              {currentQuestionIndex < questions.length - 1 ? (
                <Button variant="primary" onClick={handleNext} fullWidth>
                  Siguiente →
                </Button>
              ) : (
                <Button variant="success" onClick={handleSubmit} fullWidth>
                  Enviar Evaluación ✓
                </Button>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </AppLayout>
  );
};

export default EvaluacionFormularioPage;
