import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { RouteService } from "../../services/route.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-activity",
  templateUrl: "./create-activity.component.html",
  styleUrls: ["./create-activity.component.css"],
})
export class CreateActivityComponent {
  activityForm: FormGroup;

  constructor(private routeService: RouteService, private router: Router) {
    this.activityForm = new FormGroup({
      title: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
      ]),
      distance: new FormControl("", Validators.required),
      unit: new FormControl("KM"),
      hours: new FormControl("", Validators.required),
      min: new FormControl("1", Validators.required),
      difficult: new FormControl("Easy"),
      description: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(127),
      ]),
      image: new FormControl(),
    });
  }

  async saveActivity(): Promise<void> {
    const title = this.activityForm.get("title")?.value as string;
    const distance = this.activityForm.get("distance")?.value as number;
    const unit = this.activityForm.get("unit")?.value as string;
    const hours = this.activityForm.get("hours")?.value as string;
    const min = this.activityForm.get("min")?.value as string;
    const description = this.activityForm.get("description")?.value as string;
    const difficult = this.activityForm.get("difficult")?.value as string;

    const activity = {
      name: title,
      description,
      img: "../../../assets/img/default_activity.jpg",
      difficult,
      duration: `${ hours } h, ${ min } min`,
      distance: distance,
      unit,
      mapUrl: "",
    };

    await this.routeService.insertRoute(activity);

    this.activityForm.reset();
    Swal.fire(
      "Activity created",
      "Your activity has been created successfully!",
      "success"
    ).then(() => {
      void this.router.navigate(["routes"]);
    });
  }
}
