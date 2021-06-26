import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  isRegister = false;

  constructor(private cookieService: CookieService, private userService: AuthService) {
  }

  ngOnInit(): void {
    const token = this.cookieService.check("token");

    if (token) {
      void this.userService.get();
    }
  }
}
