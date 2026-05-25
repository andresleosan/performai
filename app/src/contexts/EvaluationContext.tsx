import React, { createContext, useContext, useState, useCallback } from 'react';
import type { EvaluationContextType, Evaluation, EvaluationResponse } from '@/types';

const EvaluationContext = createContext<EvaluationContextType | undefined>(undefined);

export interface EvaluationProviderProps {
  children: React.ReactNode;
}

/**
 * EvaluationProvider Component
 * Proveedor de contexto de evaluaciones
 */
export const EvaluationProvider: React.FC<EvaluationProviderProps> = ({ children }) => {
  const [currentEvaluation, setCurrentEvaluation] = useState<Evaluation | null>(null);
  const [answers, setAnswers] = useState<Record<string, EvaluationResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Calcular progreso
  const progress = currentEvaluation
    ? (Object.keys(answers).length / currentEvaluation.questions.length) * 100
    : 0;

  const saveAnswer = useCallback(
    (questionId: string, response: EvaluationResponse) => {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: response,
      }));
    },
    []
  );

  const submitEvaluation = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Implementar con Firebase
      if (!currentEvaluation) {
        throw new Error('No hay evaluación actual');
      }

      // Mock submission
      console.log('Evaluación enviada:', {
        evaluationId: currentEvaluation.id,
        answers,
      });

      setCurrentEvaluation(null);
      setAnswers({});
      setCurrentQuestionIndex(0);
    } catch (error) {
      console.error('Error al enviar evaluación:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [currentEvaluation, answers]);

  const value: EvaluationContextType = {
    currentEvaluation,
    answers,
    currentQuestionIndex,
    progress,
    setCurrentQuestionIndex,
    saveAnswer,
    submitEvaluation,
    isLoading,
  };

  return (
    <EvaluationContext.Provider value={value}>
      {children}
    </EvaluationContext.Provider>
  );
};

/**
 * Hook para usar el contexto de evaluación
 */
export const useEvaluation = (): EvaluationContextType => {
  const context = useContext(EvaluationContext);
  if (!context) {
    throw new Error(
      'useEvaluation debe ser usado dentro de EvaluationProvider'
    );
  }
  return context;
};

export default EvaluationContext;
