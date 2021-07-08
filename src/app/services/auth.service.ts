import { Injectable } from "@angular/core";
import { HttpClientService } from "./http-client.service";
import {
  UserApiClientInterface,
  UserApiClientUrlInterface,
} from "../models/api-client/user";
import { User } from "../models/domains/user.domain";
import { HttpRequestParamsInterface } from "../models/http-client";
import { CookieService } from "ngx-cookie-service";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService implements UserApiClientInterface {
  private userApiUrl: UserApiClientUrlInterface;

  user: User;

  constructor(
    private httpClient: HttpClientService,
    private cookieService: CookieService
  ) {
    this.userApiUrl = {
      logout: "auth/logout",
      login: "auth/login",
      signUp: "auth/register",
      user: "user",
    };
    this.user = {};
  }

  async get(): Promise<User> {
    const params: HttpRequestParamsInterface = {
      url: this.userApiUrl.user,
      requireAuthorization: true,
    };

    const user = await this.httpClient.get(params);
    this.user = user;

    return user;
  }

  login(email: string, password: string): Promise<User> {
    const params: HttpRequestParamsInterface = {
      url: this.userApiUrl.login,
      payload: { email, password },
    };

    return this.requestUser(params);
  }

  logout(): Promise<void> {
    const params: HttpRequestParamsInterface = {
      url: this.userApiUrl.logout,
      requireAuthorization: true,
    };

    return new Promise((resolve, reject) => {
      this.httpClient
        .get(params)
        .then(() => {
          this.cookieService.delete(environment.tokenKey);
          resolve();
        })
        .catch((error) => reject(error));
    });
  }

  set(token: string): void {
    this.cookieService.set(environment.tokenKey, token, 60 * 60 * 24 * 30);
  }

  signUp(user: User): Promise<User> {
    const params: HttpRequestParamsInterface = {
      url: this.userApiUrl.signUp,
      payload: { user },
    };

    return this.requestUser(params);
  }

  private requestUser(params: HttpRequestParamsInterface): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.httpClient
        .post(params)
        .then(async (response: any) => {
          const token = response.token;
          if (!token) {
            throw new Error("Response must contains token property");
          }
          this.set(token);
          const user = await this.get();

          resolve(user);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
