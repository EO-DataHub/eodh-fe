import { IHttpErrorResponse, IHttpInterceptor, IHttpRequest } from './model';

export class ParamReplacerInterceptor implements IHttpInterceptor {
  public async intercept(request: IHttpRequest): Promise<IHttpRequest> {
    return this.handleRequest(request);
  }

  public handleError = (error: IHttpErrorResponse): Promise<IHttpErrorResponse> => {
    return Promise.reject(error);
  };

  private handleRequest = (request: IHttpRequest): IHttpRequest => {
    if (!request.params || !Object.keys(request.params).length) {
      return request;
    }

    const params = new Map(Object.entries(request.params));
    let url = request.url;

    Object.entries(request.params).forEach(([key, value]) => {
      if (url?.includes(`{${key}}`)) {
        url = url?.replace(`{${key}}`, value);

        if (
          request.method === 'GET' ||
          request.method === 'get' ||
          request.method === 'POST' ||
          request.method === 'post'
        ) {
          params.delete(key);
        }
      }
    });

    return { ...request, url, params: Object.fromEntries(params) };
  };
}
