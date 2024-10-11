import Axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import { IHttpClientConfig, IHttpInterceptor, IHttpRequest } from './model';

let instance: AxiosInstance | undefined = undefined;

type TRequestConfig = {
  headers?: IHttpRequest['headers'];
  params?: IHttpRequest['params'];
};

const instances: { [key: string]: AxiosInstance } = {};

export const getHttpClient = (id = 'baseUrl') => {
  const instance = instances[id];
  if (!instance) {
    throw new Error(`HttpClient isn't initialized`);
  }

  return {
    get: <T = unknown>(url: string, options?: TRequestConfig): Promise<T> => instance.get(url, options),
    delete: <T = unknown>(url: string, options?: TRequestConfig): Promise<T> => instance.delete(url, options),
    options: <T = unknown>(url: string, options?: TRequestConfig): Promise<T> => instance.options(url, options),
    post: <T = unknown, D = unknown>(url: string, data?: D, options?: TRequestConfig): Promise<T> =>
      instance.post(url, data, options),
    put: <T = unknown, D = unknown>(url: string, data?: D, options?: TRequestConfig): Promise<T> =>
      instance.put(url, data, options),
    patch: <T = unknown, D = unknown>(url: string, data?: D, options?: TRequestConfig): Promise<T> =>
      instance.patch(url, data, options),
  };
};

export const initHttpClient = (config: IHttpClientConfig, interceptors: IHttpInterceptor[]): AxiosInstance | void => {
  const { id, baseUrl, ...axiosConfig } = config;
  instance = Axios.create({
    baseURL: config.baseUrl,
    timeout: 60000,
    ...axiosConfig,
  });

  if (!instance || !interceptors.length) {
    return;
  }

  applyInterceptors(instance, interceptors);

  instance.interceptors.response.use((response) => response.data);

  instances[id] = instance;

  return instance;
};

const applyInterceptors = (instance: AxiosInstance, interceptors: IHttpInterceptor[]) => {
  if (!instance || !interceptors.length) {
    return;
  }

  interceptors.forEach((interceptor) => {
    instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) =>
        interceptor
          .intercept(config)
          .then((request) => ({ ...config, ...request, headers: config.headers.set(request.headers) })),
      (error) => interceptor.handleError(error)
    );

    instance.interceptors.response.use(
      (response) => response,
      (error) => interceptor.handleError(error)
    );
  });
};
