import { IHttpClientConfig, IHttpErrorResponse, IHttpInterceptor, IHttpRequest, TProxyConfig } from './model';

const removeTrailingSlashes = (url: string) => {
  return url.replace(/\/+$/, '');
};

const normalizeLeadingSlash = (str: string) => {
  return str.replace(/^\/+/, '');
};

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
        console.log('key', key);
        console.log('request.url', request.url);
        const updatedUrl = normalizeLeadingSlash(request.url || '');
        console.log('updatedUrl', updatedUrl);
        return request.url?.startsWith(key) ? request.url?.replace(key, proxyConfig[key]) : undefined;
      })
      .filter((url) => !!url);

    console.log('arrayOfUrls', arrayOfUrls);
    const finalUrl = arrayOfUrls.pop();
    console.log('finalUrl', finalUrl);
    return { ...request, url: finalUrl ? finalUrl : request.url };
  };
}
