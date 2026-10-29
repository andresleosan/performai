import { createContext, useContext } from 'react';
import type { EvaluationContextType } from '@/types';

export const EvaluationContext = createContext<EvaluationContextType | undefined>(undefined);

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
