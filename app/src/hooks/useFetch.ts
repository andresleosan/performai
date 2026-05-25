import { useState, useEffect, useCallback } from 'react';

export interface UseFetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  immediate?: boolean;
}

export interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook useFetch
 * Realiza peticiones HTTP con manejo de loading y errores
 * 
 * @example
 * const { data, loading, error } = useFetch('/api/users');
 */
export function useFetch<T = any>(
  url: string,
  options: UseFetchOptions = {}
): UseFetchState<T> & { refetch: () => void } {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const {
    method = 'GET',
    headers = {},
    body,
    immediate = true,
  } = options;

  const fetchData = useCallback(async () => {
    setState({ data: null, loading: true, error: null });

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      setState({ data: null, loading: false, error: err });
      throw err;
    }
  }, [url, method, headers, body]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [immediate, fetchData]);

  return { ...state, refetch: fetchData };
}
