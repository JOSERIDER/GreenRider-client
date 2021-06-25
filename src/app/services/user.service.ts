import { Injectable } from "@angular/core";
import { HttpClientService } from "./http-client.service";
import {
  UserApiClientInterface,
  UserApiClientUrlInterface,
} from "../models/api-client/user";
import { User } from "../models/domains/user.domain";
import { HttpRequestParamsInterface } from "../models/http-client";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class UserService implements UserApiClientInterface {
  private userApiUrl: UserApiClientUrlInterface;

  constructor(
    private httpClient: HttpClientService,
    private cookieService: CookieService
  ) {
    this.userApiUrl = {
      logout: "auth/logout",
      login: "auth/login",
      signUp: "auth/sign-up",
      user: "user",
    };
  }

  get(): Promise<User> {
    const token = this.cookieService.get("token")
    const params: HttpRequestParamsInterface = {
      url: this.userApiUrl.login,
      headers: { token },
    };

    return this.httpClient.get(params);
  }

  login(email: string, password: string): Promise<User> {
    const params: HttpRequestParamsInterface = {
      url: this.userApiUrl.login,
      payload: { email, password },
    };

    return new Promise<User>((resolve, reject) => {
      this.httpClient.post(params).then((response: any) => {
        const token = response.token;
        if (!token) {
          throw new Error("Response must contains token property");
        }
        this.set(token);
        resolve(response.user);
      });
    });
  }

  logout(): Promise<void> {
    const token = this.cookieService.get("token")
    const params: HttpRequestParamsInterface = {
      url: this.userApiUrl.login,
      payload: { token },
    };

    return this.httpClient.get(params);
  }

  set(token: string): void {
    this.cookieService.set("token", token, 60 * 60 * 24 * 30);
  }

  signUp(user: User): Promise<User> {
    const params: HttpRequestParamsInterface = {
      url: this.userApiUrl.signUp,
      payload: { user },
    };

    return this.httpClient.post(params);
  }
}
