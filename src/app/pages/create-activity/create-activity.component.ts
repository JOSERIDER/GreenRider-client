import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import Swal from "sweetalert2";
import { Route } from "../../models/domains/route.domain";

@Component({
  selector: "app-create-activity",
  templateUrl: "./create-activity.component.html",
  styleUrls: ["./create-activity.component.css"],
})
export class CreateActivityComponent {
  activityForm: FormGroup;
  private newActivity: Route = {};

  constructor(
    //private rutaService: RutasService,
    private formBuilder: FormBuilder
  ) {
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

  saveActivity(): void {
    const title = this.activityForm.get("title")?.value as string;
    const distance = this.activityForm.get("distance")?.value as number;
    const unit = this.activityForm.get("unit")?.value as string;
    const hours = this.activityForm.get("hours")?.value as string;
    const min = this.activityForm.get("min")?.value as string;
    const description = this.activityForm.get("description")?.value as string;
    const difficult = this.activityForm.get("difficult")?.value as string;

    this.newActivity = {
      name: title,
      description,
      img: "../../../assets/img/default_activity.jpg",
      difficult,
      duration: `${hours} h, ${min} min`,
      distance: distance,
      unit,
      mapUrl: "",
    };

    // this.rutaService.rutasInfo.push(this.newActivity);

    this.activityForm.reset();
    void Swal.fire(
      "Actividad añadida",
      "Tu actividad se ha guardado correctamente!",
      "success"
    );
  }
}
