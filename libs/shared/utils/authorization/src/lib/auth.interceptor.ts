import { IAuthAdapter } from './types';

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
}

export interface IHttpInterceptor {
  intercept(config: IHttpRequest): Promise<IHttpRequest>;
  handleError(error: IHttpErrorResponse): Promise<IHttpErrorResponse>;
}

export class AuthInterceptor implements IHttpInterceptor {
  public constructor(protected authClient: IAuthAdapter) {}

  public async intercept(request: IHttpRequest): Promise<IHttpRequest> {
    return this.handleRequest(request, this.authClient.getToken().token);
  }

  public handleError = (error: IHttpErrorResponse): Promise<IHttpErrorResponse> => {
    if (error.response?.status === 401) {
      this.authClient.logout();
    }

    return Promise.reject(error);
  };

  private handleRequest = (request: IHttpRequest, accessToken: string | undefined): IHttpRequest => {
    return { ...request, headers: this.getHeaders(request, accessToken) };
  };

  private getHeaders = (config: IHttpRequest, accessToken: string | undefined): IHttpRequest['headers'] => {
    if (!accessToken) {
      return config.headers;
    }

    return { ...config.headers, Authorization: `Bearer ${accessToken}` };
  };
}
