import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppComponent } from "../../app.component";
import Swal from "sweetalert2";
import { User } from "../../models/domains/user.domain";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  registerForm: FormGroup;
  remember: boolean;

  constructor(
    private userService: AuthService,
    private router: Router,
    private component: AppComponent
  ) {
    this.remember = false;
    this.registerForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
      ]),
      name: new FormControl("", Validators.required),
      remember: new FormControl(),
    });
    this.component.isRegister = true;
  }

  register() {
    const email = this.registerForm.get("email")?.value as string;
    const name = this.registerForm.get("name")?.value as string;
    const password = this.registerForm.get("password")?.value as string;

    void Swal.fire({
      icon: "info",
      text: "Wait free...",
    });
    Swal.showLoading();
    const user: User = {
      id: "",
      name,
      password,
      email,
    };
    this.userService
      .signUp(user)
      .then(() => {
        void Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Register successful",
          showConfirmButton: false,
          timer: 1500,
        });
        void this.router.navigate(["dashboard"]);
        this.component.isRegister = false;
      })
      .catch((error) => {
        void Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      });
  }

  goBack(): void {
    this.component.isRegister = false;
    void this.router.navigate(["/"]);
  }
}
