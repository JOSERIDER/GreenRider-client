import { HttpRequestParamsInterface } from './HttpRequestParams.interface';
import { Injectable } from "@angular/core";

@Injectable()
export abstract class HttpClientInterface {
  abstract get<T>(params: HttpRequestParamsInterface): Promise<T>;

  abstract post<T>(params: HttpRequestParamsInterface): Promise<T>;

  abstract put<T>(params: HttpRequestParamsInterface): Promise<T>;

  abstract delete(params: HttpRequestParamsInterface): Promise<void>;
}
