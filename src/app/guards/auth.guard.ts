import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) {
  }

  canActivate(): boolean {
    const token = this.cookieService.check(environment.tokenKey);

    if (token) {
      return true;
    }
    void this.router.navigate(["dashboard"]);

    return false;
  }
}
