import Axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import { IHttpClientConfig, IHttpInterceptor, IHttpRequest } from './model';

let instance: AxiosInstance | undefined = undefined;

type TRequestConfig = {
  headers?: IHttpRequest['headers'];
  params?: IHttpRequest['params'];
};

export const getHttpClient = (id = 'baseUrl'): AxiosInstance => {
  const instance = instances[id];
  if (!instance) {
    throw new Error(`HttpClient isn't initialized`);
  }

  return {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    get: <T = any>(url: string, options?: TRequestConfig): Promise<T> => instance!.get(url, options),
    /* eslint-disable @typescript-eslint/no-explicit-any */
    delete: <T = any>(url: string, options?: TRequestConfig): Promise<T> => instance!.delete(url, options),
    /* eslint-disable @typescript-eslint/no-explicit-any */
    options: <T = any>(url: string, options?: TRequestConfig): Promise<T> => instance!.options(url, options),
    /* eslint-disable @typescript-eslint/no-explicit-any */
    post: <T = any, D = any>(url: string, data?: D, options?: TRequestConfig): Promise<T> =>
      instance!.post(url, data, options),
    /* eslint-disable @typescript-eslint/no-explicit-any */
    put: <T = any, D = any>(url: string, data?: D, options?: TRequestConfig): Promise<T> =>
      instance!.put(url, data, options),
    /* eslint-disable @typescript-eslint/no-explicit-any */
    patch: <T = any, D = any>(url: string, data?: D, options?: TRequestConfig): Promise<T> =>
      instance!.patch(url, data, options),
  };
};

const instances: { [key: string]: AxiosInstance } = {};

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
