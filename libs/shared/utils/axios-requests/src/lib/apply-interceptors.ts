import { InternalAxiosRequestConfig } from 'axios';

import { apiClient } from './api-client';

interface IHttpErrorResponse {
  response: {
    status: number;
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
interface IHttpRequest extends Record<string, any> {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  headers?: Record<string, any>;
  url?: string;
  params?: { [key: string]: string };
}

interface IHttpInterceptor {
  intercept(config: IHttpRequest): Promise<IHttpRequest>;
  handleError(error: IHttpErrorResponse): Promise<IHttpErrorResponse>;
}

export const applyInterceptors = (interceptors: IHttpInterceptor[]) => {
  if (!interceptors.length) {
    return;
  }

  interceptors.forEach((interceptor) => {
    apiClient.interceptors.request.use(
      (config: InternalAxiosRequestConfig) =>
        interceptor
          .intercept(config)
          .then((request) => ({ ...config, ...request, headers: config.headers.set(request.headers) })),
      (error) => interceptor.handleError(error)
    );

    apiClient.interceptors.response.use(
      (response) => response,
      (error) => interceptor.handleError(error)
    );
  });
};
