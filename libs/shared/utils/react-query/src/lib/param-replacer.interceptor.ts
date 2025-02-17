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

    let url = request.url;

    Object.entries(request.params).forEach(([key, value]) => {
      url = url?.replace(`{${key}}`, value);
    });

    return { ...request, url };
  };
}
