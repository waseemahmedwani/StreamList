import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { TMDB_ACCESS_TOKEN, TMDB_BASE_URL } from '@env';
import type { ApiNormalizedError } from './types';

type RetriableConfig = InternalAxiosRequestConfig & { __retry?: boolean };

const client = axios.create({
  baseURL: TMDB_BASE_URL,
});

client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${TMDB_ACCESS_TOKEN}`;
  return config;
});

function extractMessage(data: unknown): string | undefined {
  if (typeof data !== 'object' || data === null) {
    return undefined;
  }
  const record = data as Record<string, unknown>;
  if (typeof record.status_message === 'string') {
    return record.status_message;
  }
  if (typeof record.message === 'string') {
    return record.message;
  }
  return undefined;
}

function normalizeError(error: unknown): ApiNormalizedError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 0;
    const fromBody = extractMessage(error.response?.data);
    return {
      message: fromBody ?? error.message,
      status,
    };
  }
  if (error instanceof Error) {
    return { message: error.message, status: 0 };
  }
  return { message: 'Unknown error', status: 0 };
}

function isRetryableNetworkError(error: AxiosError): boolean {
  if (error.response !== undefined) {
    return false;
  }
  if (error.code === 'ERR_CANCELED') {
    return false;
  }
  return true;
}

client.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const config = error.config as RetriableConfig | undefined;
    if (
      config !== undefined &&
      isRetryableNetworkError(error) &&
      config.__retry !== true
    ) {
      config.__retry = true;
      return client.request(config);
    }
    return Promise.reject(normalizeError(error));
  },
);

export default client;
