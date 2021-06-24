import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent {
  searchControl: FormControl;
  newsletter: FormGroup;

  constructor() {
    this.searchControl = new FormControl("");
    this.newsletter = new FormGroup({
      name: new FormControl("", [Validators.required]),
      surname: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.email, Validators.required]),
    });
  }

  onSearch() {
    //TODO
  }

  addNewsletter() {
    //Todo
  }
}
