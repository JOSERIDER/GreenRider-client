import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Route } from "../../models/domains/route.domain";

@Component({
  selector: "app-route-card",
  templateUrl: "./route-card.component.html",
  styleUrls: ["./route-card.component.css"],
})
export class RouteCardComponent {
  @Input() route: Route = {};

  @Input() index: number;

  @Output() selectedRoute: EventEmitter<number>;

  constructor() {
    this.index = 0;
    this.selectedRoute = new EventEmitter<number>();
  }

  showRoute(): void {
    this.selectedRoute.emit(this.index);
  }
}
