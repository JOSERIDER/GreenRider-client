import { Component } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { Route } from "../../models/domains/route.domain";
import { ActivatedRoute } from "@angular/router";
import { RouteService } from "../../services/route.service";

@Component({
  selector: "app-route",
  templateUrl: "./route.component.html",
  styleUrls: ["./route.component.css"],
})
export class RouteComponent {
  route: Route;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private rutasService: RouteService
  ) {
    this.route = {};
    this._activatedRoute.params.subscribe(async (params) => {
      const id = params["id"];
      this.route = await this.rutasService.get(id);
    });
  }
}
