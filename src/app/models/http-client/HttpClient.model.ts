import { HttpClientInterface } from './HttpClient.interface';
import { HttpRequestParamsInterface } from './HttpRequestParams.interface';

export class HttpClientModel implements HttpClientInterface {
  get<T>(params: HttpRequestParamsInterface): Promise<T> {
    return Promise.resolve(undefined);
  }

  post<T>(params: HttpRequestParamsInterface): Promise<T> {
    return Promise.resolve(undefined);
  }

  put<T>(params: HttpRequestParamsInterface): Promise<T> {
    return Promise.resolve(undefined);
  }

  update<T>(params: HttpRequestParamsInterface): Promise<T> {
    return Promise.resolve(undefined);
  }

  delete(params: HttpRequestParamsInterface): Promise<void> {
    return Promise.resolve(undefined);
  }
}
