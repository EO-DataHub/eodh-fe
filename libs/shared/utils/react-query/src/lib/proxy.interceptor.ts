import { IHttpClientConfig, IHttpErrorResponse, IHttpInterceptor, IHttpRequest, TProxyConfig } from './model';

export class ProxyInterceptor implements IHttpInterceptor {
  public constructor(protected config: IHttpClientConfig) {}

  public async intercept(request: IHttpRequest): Promise<IHttpRequest> {
    return this.handleRequest(request, this.config.proxyConfig);
  }

  public handleError = (error: IHttpErrorResponse): Promise<IHttpErrorResponse> => {
    return Promise.reject(error);
  };

  private handleRequest = (request: IHttpRequest, proxyConfig?: TProxyConfig): IHttpRequest => {
    if (!proxyConfig || !Object.keys(proxyConfig).length) {
      return request;
    }

    const arrayOfUrls = Object.entries(proxyConfig)
      .map(([key]) => {
        return request.url?.startsWith(key) ? request.url?.replace(key, proxyConfig[key]) : undefined;
      })
      .filter((url) => !!url);

    return { ...request, url: arrayOfUrls.length ? arrayOfUrls.pop() : request.url };
  };
}
