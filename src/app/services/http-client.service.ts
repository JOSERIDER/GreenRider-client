import { Injectable } from "@angular/core";
import {
  HttpClientInterface,
  HttpRequestParamsInterface,
} from "../models/http-client";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class HttpClientService implements HttpClientInterface {
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  get<T>(params: HttpRequestParamsInterface): Promise<T> {
    const config = {
      params: params.payload ? params.payload : null,
      headers: params.headers ? new HttpHeaders(params.headers) : null,
    };

    return new Promise<T>((resolve, reject) => {
      this.httpClient
        .get(`${environment.apiUrl}/${params.url}`, config)
        .toPromise()
        .then((response) => {
          resolve(response as T);
        })
        .catch(reject);
    });
  }

  post<T>(params: HttpRequestParamsInterface): Promise<T> {
    const userToken: string = this.cookieService.get(environment.tokenKey);

    const config = {
      body: params.payload ? params.payload : null,
      headers: new HttpHeaders({ authorization: `Bearer ${userToken}` }),
    };

    return new Promise<T>((resolve, reject) => {
      this.httpClient
        .post(`${environment.apiUrl}/${params.url}`, config.body, {
          headers: config.headers,
        })
        .toPromise()
        .then((response) => resolve(response as T))
        .catch(reject);
    });
  }

  put<T>(params: HttpRequestParamsInterface): Promise<T> {
    const userToken: string = this.cookieService.get(environment.tokenKey);

    const config = {
      body: params.payload ? params.payload : null,
      headers: new HttpHeaders({ authorization: `Bearer ${userToken}` }),
    };

    return new Promise<T>((resolve, reject) => {
      this.httpClient
        .put(`${environment.apiUrl}/${params.url}`, config.body, {
          headers: config.headers,
        })
        .toPromise()
        .then((response) => resolve(response as T))
        .catch(reject);
    });
  }

  async delete(params: HttpRequestParamsInterface): Promise<void> {
    const userToken: string = this.cookieService.get(environment.tokenKey);

    const config = {
      params: params.payload ? params.payload : null,
      headers: new HttpHeaders({ authorization: `Bearer ${userToken}` }),
    };

    await this.httpClient
      .delete(`${environment.apiUrl}/${params.url}`, {
        params: config.params,
        headers: config.headers,
      })
      .toPromise();

    return Promise.resolve();
  }
}
