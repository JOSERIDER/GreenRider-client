import { Component, OnInit } from "@angular/core";
import { Route } from "../../models/domains/route.domain";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RouteService } from "../../services/route.service";

@Component({
  selector: "app-routes",
  templateUrl: "./routes.component.html",
  styleUrls: ["./routes.component.css"],
})
export class RoutesComponent implements OnInit {
  routes: Route[] = [];
  filterRoutes: Route[] = [];
  filterFrom: FormGroup;
  constructor(private routeService: RouteService, private router: Router) {
    this.filterFrom = new FormGroup({
      difficult: new FormControl("0", Validators.required),
      duration: new FormControl("0", Validators.required),
    });
  }

  async ngOnInit() {
    await this.updateRoutes();
  }

  async showRoute(routeId: number): Promise<void> {
    await this.router.navigate(["/route", routeId]);
  }

  async restoreFilters() {
    this.filterFrom.reset({
      difficult: "0",
      duration: "0",
    });

    this.routes = await this.routeService.getRoutes();
  }

  async filterDifficult() {
    const difficult = this.filterFrom.get("difficult")?.value as string;
    const duration = this.filterFrom.get("duration")?.value as string;
    //TODO Filter in backend.

    if (this.routes.length == 0) {
      //TODO
      // Swal.fire({
      //   icon: "error",
      //   title: "Parece que has filtrado demasiado",
      //   text: "La búsqueda no ha tenido resultados.",
      // });
     await this.updateRoutes();
    }
  }

  async updateRoutes() {
    this.routes = await this.routeService.getRoutes();
  }
}
