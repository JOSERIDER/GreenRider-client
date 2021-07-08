import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Route } from "../../models/domains/route.domain";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  routeInfo: Route[] = [];
  word: string;
  constructor(
    private _activatedRoute: ActivatedRoute,
    //private _rutaService: RutasService,
    private _router: Router
  ) {
    this.word = "";
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this.word = params["word"] as string;
      // this.routeInfo = this._rutaService.buscarRuta(this.palabraBuscada);
    });
  }

  async showRoute(index: string): Promise<void> {
    await this._router.navigate(["/route", index]);
  }
}
