import { Injectable } from '@angular/core';
import {
  HttpClientInterface,
  HttpRequestParamsInterface,
} from '../models/http-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Route } from "../models/domains/route.domain";

@Injectable({
  providedIn: 'root',
})
export class HttpClientService implements HttpClientInterface {
  constructor(private httpClient: HttpClient) {}

  get<T>(params: HttpRequestParamsInterface): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const config = { params: params.payload ? params.payload : null };
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
    return new Promise<T>((resolve, reject) => {
      this.httpClient
        .post(`${environment.apiUrl}/${params.url}`, {
          params: { id: params.payload.id, payload: params.payload },
          headers: new HttpHeaders({
            //TODO
            'token ': 'my-auth-token',
          }),
        })
        .toPromise()
        .then((response) => resolve(response as T))
        .catch(reject);
    });
  }

  put<T>(params: HttpRequestParamsInterface): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.httpClient
        .put(`${environment.apiUrl}/${params.url}`, {
          params: { id: params.payload.id, payload: params.payload },
          headers: new HttpHeaders({
            //TODO
            'token ': 'my-auth-token',
          }),
        })
        .toPromise()
        .then((response) => resolve(response as T))
        .catch(reject);
    });
  }

  async delete(params: HttpRequestParamsInterface): Promise<void> {
    await this.httpClient
      .delete(`${environment.apiUrl}/${params.url}`, {
        params: { id: params.payload.id },
        headers: new HttpHeaders({
          //TODO
          'token ': 'my-auth-token',
        }),
      })
      .toPromise();

    return Promise.resolve();
  }
}
