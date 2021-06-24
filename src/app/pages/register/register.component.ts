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
  user: User;
  remember: boolean;
  constructor(
    private authFireBase: AuthService,
    private router: Router,
    private component: AppComponent
  ) {
    this.remember = false;
    this.user = {};
    this.registerForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
      ]),
      remember: new FormControl(),
    });
    this.component.isRegister = true;
  }

  register(): void {
    //Inicialización de datos al usuario.
    const remember = this.registerForm.get("remember")?.value as boolean;
    this.user.email = this.registerForm.get("email")?.value as string;
    const password = this.registerForm.get("password")?.value as string;

    void Swal.fire({
      icon: "info",
      text: "Wait free...",
    });
    Swal.showLoading();
    //TODO
  }

  goBack(): void {
    this.component.isRegister = false;
    void this.router.navigate(["home"]);
  }
}
