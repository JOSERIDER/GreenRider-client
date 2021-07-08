import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Route } from "../../models/domains/route.domain";

@Component({
  selector: "app-route-card",
  templateUrl: "./route-card.component.html",
  styleUrls: ["./route-card.component.css"],
})
export class RouteCardComponent {
  @Input() route: Route = {};

  @Output() selectedRoute: EventEmitter<string>;

  constructor() {
    this.selectedRoute = new EventEmitter<string>();
  }

  showRoute(): void {
    this.selectedRoute.emit(this.route.id);
  }
}
