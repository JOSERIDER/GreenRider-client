import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
  searchForm: FormControl;
  loginForm: FormGroup;
  logged = false;

  constructor(private router: Router) {
    this.searchForm = new FormControl("");
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  async onSearch(word: string) {
    await this.router.navigate(["search", word]);
  }

  login() {
    //TODO
  }

  logout() {
    //TODO
  }
}
