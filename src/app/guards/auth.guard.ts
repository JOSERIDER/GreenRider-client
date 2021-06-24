import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  public authenticated: boolean;

  constructor(private router: Router) {
    this.authenticated = false;
  }

  canActivate(): boolean {
    if (
      this.authenticated &&
      (localStorage.getItem("token")?.length || 0) > 2
    ) {
      return true;
    }
    void this.router.navigate(["dashboard"]);
    return false;
  }
}
