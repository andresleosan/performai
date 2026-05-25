import { useState, useCallback } from 'react';

export interface UseFormOptions<T> {
  initialValues: T;
  onSubmit?: (values: T) => void | Promise<void>;
  validate?: (values: T) => Record<keyof T, string>;
}

export interface UseFormState<T> {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
}

/**
 * Hook useForm
 * Gestiona estado de formularios con validación
 * 
 * @example
 * const { values, handleChange, handleSubmit } = useForm({
 *   initialValues: { email: '', password: '' },
 *   onSubmit: (values) => console.log(values)
 * });
 */
export function useForm<T extends Record<string, any>>(options: UseFormOptions<T>) {
  const { initialValues, onSubmit, validate } = options;

  const [state, setState] = useState<UseFormState<T>>({
    values: initialValues,
    errors: {} as Record<keyof T, string>,
    touched: {} as Record<keyof T, boolean>,
    isSubmitting: false,
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const inputValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

      setState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          [name]: inputValue,
        },
      }));
    },
    []
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target;

      setState((prev) => ({
        ...prev,
        touched: {
          ...prev.touched,
          [name]: true,
        },
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Validar si existe función validate
      if (validate) {
        const errors = validate(state.values);
        setState((prev) => ({
          ...prev,
          errors,
          touched: Object.keys(initialValues).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {} as Record<keyof T, boolean>
          ),
        }));

        // Si hay errores, no enviar
        if (Object.keys(errors).length > 0) {
          return;
        }
      }

      // Llamar onSubmit si existe
      if (onSubmit) {
        setState((prev) => ({ ...prev, isSubmitting: true }));
        try {
          await onSubmit(state.values);
        } finally {
          setState((prev) => ({ ...prev, isSubmitting: false }));
        }
      }
    },
    [state.values, validate, initialValues, onSubmit]
  );

  const resetForm = useCallback(() => {
    setState({
      values: initialValues,
      errors: {} as Record<keyof T, string>,
      touched: {} as Record<keyof T, boolean>,
      isSubmitting: false,
    });
  }, [initialValues]);

  const setFieldValue = useCallback((name: keyof T, value: any) => {
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value,
      },
    }));
  }, []);

  return {
    ...state,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
  };
}
