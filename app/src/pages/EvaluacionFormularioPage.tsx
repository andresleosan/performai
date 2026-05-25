import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Button } from '@/components/common';
import { AppLayout } from '@/components/layout';
import { useAuth } from '@/contexts/AuthContext';

interface EvaluationTarget {
  id: number;
  colaborador: string;
  rol: string;
  departamento: string;
}

interface Answer {
  questionId: string;
  value: number;
  justification: string;
}

export const EvaluacionFormularioPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [evaluationTarget, setEvaluationTarget] = useState<EvaluationTarget | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [currentValue, setCurrentValue] = useState(3);
  const [justification, setJustification] = useState('');
  const [notApplicable, setNotApplicable] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Preguntas específicas de evaluación 360°
  const questions = [
    { id: 'q1', text: '¿El colaborador demuestra iniciativa y proactividad en sus tareas?', category: 'Iniciativa' },
    { id: 'q2', text: '¿Mantiene una comunicación efectiva con el equipo?', category: 'Comunicación' },
    { id: 'q3', text: '¿Cumple con los plazos establecidos?', category: 'Responsabilidad' },
    { id: 'q4', text: '¿Demuestra liderazgo y capacidad de guiar al equipo?', category: 'Liderazgo' },
    { id: 'q5', text: '¿Contribuye de manera significativa a los objetivos del departamento?', category: 'Contribución' },
    { id: 'q6', text: '¿Toma decisiones sólidas y fundamentadas?', category: 'Toma de Decisiones' },
    { id: 'q7', text: '¿Muestra disposición a aprender y mejorar constantemente?', category: 'Desarrollo' },
    { id: 'q8', text: '¿Colabora efectivamente con otros departamentos?', category: 'Colaboración' },
    { id: 'q9', text: '¿Maneja conflictos de forma constructiva?', category: 'Gestión de Conflictos' },
    { id: 'q10', text: '¿Demuestra ética profesional y valores empresariales?', category: 'Ética' },
    { id: 'q11', text: '¿Tiene potencial para asumir mayores responsabilidades?', category: 'Potencial' },
  ];

  useEffect(() => {
    const stored = localStorage.getItem('evaluationTarget');
    if (stored) {
      setEvaluationTarget(JSON.parse(stored));
    }
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;

  const handleSaveAnswer = () => {
    const answer: Answer = {
      questionId: currentQuestion.id,
      value: currentValue,
      justification,
    };
    setAnswers({ ...answers, [currentQuestion.id]: answer });
  };

  const handleNext = () => {
    handleSaveAnswer();
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      const existing = answers[questions[nextIndex]?.id];
      setCurrentValue(existing?.value || 3);
      setJustification(existing?.justification || '');
      setNotApplicable(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      const existing = answers[questions[prevIndex]?.id];
      setCurrentValue(existing?.value || 3);
      setJustification(existing?.justification || '');
      setNotApplicable(false);
    }
  };

  const handleSubmit = () => {
    handleSaveAnswer();
    // Guardar evaluación completa
    localStorage.setItem('evaluation', JSON.stringify({
      target: evaluationTarget,
      answers,
      timestamp: new Date().toISOString(),
      evaluator: user?.email,
    }));
    setSubmitted(true);
    setTimeout(() => {
      navigate('/dashboard/lider');
    }, 2000);
  };

  const jumpToQuestion = (index: number) => {
    handleSaveAnswer();
    setCurrentQuestionIndex(index);
    const existing = answers[questions[index]?.id];
    setCurrentValue(existing?.value || 3);
    setJustification(existing?.justification || '');
  };

  if (!evaluationTarget) {
    return (
      <AppLayout user={user} onLogout={logout}>
        <div className="px-4 py-8 max-w-3xl mx-auto text-center">
          <p className="text-gray-600">Por favor selecciona un colaborador para evaluar.</p>
          <Button variant="primary" onClick={() => navigate('/dashboard/lider')} className="mt-4">
            Volver al Dashboard
          </Button>
        </div>
      </AppLayout>
    );
  }

  if (submitted) {
    return (
      <AppLayout user={user} onLogout={logout}>
        <div className="px-4 py-8 max-w-3xl mx-auto text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-4xl font-bold text-green-600 mb-4">¡Evaluación Completada!</h1>
          <p className="text-xl text-gray-600 mb-4">
            Gracias por evaluar a <span className="font-bold text-primary-700">{evaluationTarget.colaborador}</span>
          </p>
          <p className="text-gray-600">Redirigiendo al dashboard...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout user={user} onLogout={logout}>
      <div className="px-4 py-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => navigate('/dashboard/lider')}
            className="mb-4"
          >
            ← Volver
          </Button>
          <h1 className="text-4xl font-bold text-primary-700 mb-2">Evaluación 360°</h1>
          <p className="text-lg text-gray-600">Evaluando a: <span className="font-bold text-primary-600">{evaluationTarget.colaborador}</span> ({evaluationTarget.rol})</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Question Navigator */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 border-2 border-primary-100 shadow-sm">
              <CardBody>
                <h3 className="font-bold text-primary-700 mb-4 text-lg">Navegador</h3>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-gray-600">Progreso</span>
                    <span className="text-sm font-bold text-primary-600">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-600 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  {questions.map((q, idx) => {
                    const isAnswered = !!answers[q.id];
                    const isCurrent = idx === currentQuestionIndex;
                    return (
                      <button
                        key={q.id}
                        onClick={() => jumpToQuestion(idx)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all font-semibold text-sm ${
                          isCurrent
                            ? 'bg-primary-600 text-white shadow-md'
                            : isAnswered
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {isAnswered ? '✓' : '○'} P{idx + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Question Card */}
            <Card className="border-2 border-primary-100 shadow-md bg-white">
              <CardBody>
                {/* Question Header */}
                <div className="mb-6 pb-4 border-b-2 border-primary-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-primary-600 uppercase">Pregunta {currentQuestionIndex + 1} de {questions.length}</span>
                    <span className="text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-bold">{currentQuestion.category}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{currentQuestion.text}</h2>
                </div>

                {/* Rating Scale */}
                <div className="mb-8">
                  <label className="block font-bold text-gray-900 mb-4 text-lg">Escala de evaluación (1-5)</label>
                  <div className="flex gap-3 mb-4">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        onClick={() => setCurrentValue(val)}
                        disabled={notApplicable}
                        className={`flex-1 py-4 rounded-lg font-bold text-lg transition-all border-2 ${
                          currentValue === val
                            ? 'bg-primary-600 text-white border-primary-600 shadow-md scale-105'
                            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                        } ${notApplicable ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 font-semibold">
                    <span>Totalmente desacuerdo</span>
                    <span>Totalmente de acuerdo</span>
                  </div>
                </div>

                {/* Not Applicable */}
                <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notApplicable}
                      onChange={(e) => setNotApplicable(e.target.checked)}
                      className="w-5 h-5 accent-primary-600 cursor-pointer"
                    />
                    <span className="text-gray-700 font-semibold">No aplica para este rol</span>
                  </label>
                </div>

                {/* Justification */}
                <div className="mb-8">
                  <label className="block font-bold text-gray-900 mb-3">Justificación (opcional)</label>
                  <textarea
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                    placeholder="Describe tu respuesta y proporciona ejemplos específicos..."
                    disabled={notApplicable}
                    className="w-full min-h-28 px-4 py-3 border-2 border-gray-200 rounded-lg font-sans focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-300 transition-all disabled:opacity-50"
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4">
                  <Button
                    variant="secondary"
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="flex-1"
                  >
                    ← Anterior
                  </Button>
                  {currentQuestionIndex < questions.length - 1 ? (
                    <Button 
                      variant="primary" 
                      onClick={handleNext}
                      className="flex-1"
                    >
                      Siguiente →
                    </Button>
                  ) : (
                    <Button 
                      variant="success" 
                      onClick={handleSubmit}
                      className="flex-1 text-lg font-bold"
                    >
                      ✓ Enviar Evaluación
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default EvaluacionFormularioPage;
