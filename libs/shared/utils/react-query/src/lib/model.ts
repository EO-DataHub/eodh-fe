import { Method } from 'axios';

export interface IHttpErrorResponse {
  response: {
    status: number;
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IHttpRequest extends Record<string, any> {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  headers?: Record<string, any>;
  url?: string;
  params?: { [key: string]: string };
  method?: Method | string | undefined;
}

export interface IHttpInterceptor {
  intercept(config: IHttpRequest): Promise<IHttpRequest>;
  handleError(error: IHttpErrorResponse): Promise<IHttpErrorResponse>;
}

export type TProxyConfig = { [key: string]: string };

export interface IHttpClientConfig {
  proxyConfig?: TProxyConfig;
}
