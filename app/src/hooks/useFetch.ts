import { useState, useEffect, useCallback } from 'react';

export interface UseFetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  immediate?: boolean;
}

export interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/** Realiza peticiones HTTP; cancela respuestas obsoletas al cambiar la solicitud. */
export function useFetch<T = unknown>(
  url: string,
  options: UseFetchOptions = {}
): UseFetchState<T> & { refetch: () => void } {
  const { method = 'GET', headers = {}, body, immediate = true } = options;
  const [revision, setRevision] = useState(0);
  const request = JSON.stringify({ url, method, headers, body, revision });
  const active = immediate || revision > 0;
  const [result, setResult] = useState<{ request: string; data: T | null; error: Error | null } | null>(null);

  useEffect(() => {
    if (!active) return;
    const controller = new AbortController();
    const config = JSON.parse(request) as { url: string; method: string; headers: Record<string, string>; body?: unknown };
    async function load() {
      try {
        const response = await fetch(config.url, {
          method: config.method,
          headers: { 'Content-Type': 'application/json', ...config.headers },
          body: config.body === undefined ? undefined : JSON.stringify(config.body),
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        const data = await response.json() as T;
        if (!controller.signal.aborted) setResult({ request, data, error: null });
      } catch (error) {
        if (!controller.signal.aborted) {
          setResult({ request, data: null, error: error instanceof Error ? error : new Error(String(error)) });
        }
      }
    }
    void load();
    return () => controller.abort();
  }, [request, active]);

  const refetch = useCallback(() => setRevision(value => value + 1), []);
  const current = result?.request === request ? result : null;
  return {
    data: current?.data ?? null,
    error: current?.error ?? null,
    loading: active && current === null,
    refetch,
  };
}
