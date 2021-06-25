import { Injectable } from '@angular/core';
import { Route } from '../models/domains/route.domain';
import { HttpRequestParamsInterface } from '../models/http-client';
import {
  RouteApiClientInterface,
  RouteApiClientUrlInterface,
} from '../models/api-client/route';
import { HttpClientService } from './http-client.service';

@Injectable()
export class RouteService implements RouteApiClientInterface {
  private routeParams: RouteApiClientUrlInterface;

  constructor(private httpClient: HttpClientService) {
    this.routeParams = {
      routes: 'routes',
    };
  }

  getRoutes(): Promise<Route[]> {
    const params: HttpRequestParamsInterface = {
      url: this.routeParams.routes,
    };


    return this.httpClient.get(params);
  }

  get(id: string): Promise<Route> {
    const params: HttpRequestParamsInterface = {
      url: `${this.routeParams.routes}/${id}`,
    };

    return this.httpClient.get(params);
  }

  insertRoute(route: Route): Promise<Route> {
    const params: HttpRequestParamsInterface = {
      url: this.routeParams.routes,
      payload: route,
    };

    return this.httpClient.post(params);
  }

  updateRoute(route: Route): Promise<Route> {
    const params: HttpRequestParamsInterface = {
      url: this.routeParams.routes,
      payload: route,
    };

    return this.httpClient.put(params);
  }

  deleteRoute(id: string): Promise<void> {
    const params: HttpRequestParamsInterface = {
      url: this.routeParams.routes,
      payload: { id },
    };

    return this.httpClient.delete(params);
  }
}
