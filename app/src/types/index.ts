// Button Component Types
export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

// Card Component Types
export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

// Input Component Types
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'search';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  fullWidth?: boolean;
}

// Badge Component Types
export type BadgeColor = 'purple' | 'navy' | 'green' | 'gray';

export interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  className?: string;
}

// Common User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'lider' | 'colaborador';
  avatar?: string;
}

// Evaluation Types
export interface Question {
  id: string;
  text: string;
  type: 'escala' | 'multiplechoice' | 'texto';
  categoria?: string;
  aplicaA: 'base' | 'gerente' | 'senior' | 'junior' | 'pasante' | 'todos';
}

export interface Evaluation {
  id: string;
  colaboradorId: string;
  liderEmitter: string;
  questions: Question[];
  answers: Record<string, any>;
  status: 'draft' | 'in_progress' | 'completed' | 'submitted';
  createdAt: Date;
  completedAt?: Date;
}

export interface EvaluationResponse {
  questionId: string;
  value: number | string | string[];
  justification?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Auth Types
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register?: (email: string, password: string, name: string) => Promise<void>;
}

// Evaluation Context Types
export interface EvaluationContextType {
  currentEvaluation: Evaluation | null;
  answers: Record<string, EvaluationResponse>;
  currentQuestionIndex: number;
  progress: number;
  setCurrentQuestionIndex: (index: number) => void;
  saveAnswer: (questionId: string, response: EvaluationResponse) => void;
  submitEvaluation: () => Promise<void>;
  isLoading: boolean;
}
