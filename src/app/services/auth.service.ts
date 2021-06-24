import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/domains/user.domain";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private httpModule: HttpClient) {}

  register(user: User) {
    //
  }
}
