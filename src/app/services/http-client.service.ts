import { Injectable } from "@angular/core";
import {
  HttpClientInterface,
  HttpRequestParamsInterface,
} from "../models/http-client";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class HttpClientService implements HttpClientInterface {
  constructor(private httpClient: HttpClient) {
  }

  get<T>(params: HttpRequestParamsInterface): Promise<T> {
    const config = {
      params: params.payload ? params.payload : null,
      headers: params.headers ? new HttpHeaders(params.headers) : null,
    };

    return new Promise<T>((resolve, reject) => {
      this.httpClient
        .get(`${ environment.apiUrl }/${ params.url }`, config)
        .toPromise()
        .then((response) => {
          resolve(response as T);
        })
        .catch(reject);
    });
  }

  post<T>(params: HttpRequestParamsInterface): Promise<T> {
    const config = {
      params: params.payload ? params.payload : null,
      headers: params.headers ? new HttpHeaders(params.headers) : null,
    };

    return new Promise<T>((resolve, reject) => {
      this.httpClient
        .post(`${ environment.apiUrl }/${ params.url }`,config)
        .toPromise()
        .then((response) => resolve(response as T))
        .catch(reject);
    });
  }

  put<T>(params: HttpRequestParamsInterface): Promise<T> {
    const config = {
      params: params.payload ? params.payload : null,
      headers: params.headers ? new HttpHeaders(params.headers) : null,
    };

    return new Promise<T>((resolve, reject) => {
      this.httpClient
        .put(`${ environment.apiUrl }/${ params.url }`, config)
        .toPromise()
        .then((response) => resolve(response as T))
        .catch(reject);
    });
  }

  async delete(params: HttpRequestParamsInterface): Promise<void> {
    const config = {
      params: params.payload ? params.payload : null,
      headers: params.headers ? new HttpHeaders(params.headers) : null,
    };

    await this.httpClient
      .delete(`${ environment.apiUrl }/${ params.url }`, config)
      .toPromise();

    return Promise.resolve();
  }
}
