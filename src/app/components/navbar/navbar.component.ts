import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import Swal from "sweetalert2";
import { CookieService } from "ngx-cookie-service";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
  searchForm: FormControl;
  loginForm: FormGroup;
  logged = false;

  constructor(
    private router: Router,
    private userService: AuthService,
    private cookieService: CookieService
  ) {
    this.searchForm = new FormControl("");
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
    this.logged = this.cookieService.check(environment.tokenKey);
  }

  async onSearch(word: string) {
    await this.router.navigate(["search", word]);
  }

  login() {
    const email = this.loginForm.get("email")?.value as string;
    const password = this.loginForm.get("password")?.value as string;

    void Swal.fire({
      icon: "info",
      text: "please wait...",
    });
    Swal.showLoading();
    this.userService
      .login(email, password)
      .then(() => {
        void Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        this.logged = true;
      })
      .catch((error) => {
        void Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      });
  }

  logout() {
    void Swal.fire({
      icon: "info",
      text: "please wait...",
    });
    Swal.showLoading();
    this.userService
      .logout()
      .then(() => {
        void Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout successful",
          showConfirmButton: false,
          timer: 1500,
        });
        this.logged = false;
      })
      .catch((error) => {
        void Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      });
  }
}
