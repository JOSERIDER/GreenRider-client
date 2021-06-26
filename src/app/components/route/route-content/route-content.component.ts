import { Component, Input, OnInit } from '@angular/core';
import { Route } from "../../../models/domains/route.domain";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-route-content',
  templateUrl: './route-content.component.html',
  styleUrls: ['./route-content.component.css']
})
export class RouteContentComponent {

  @Input() route: Route = {};

  validUrl: SafeUrl;
  constructor(private sanitizer: DomSanitizer,) {
    this.validUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.route.mapUrl || ""
    );
  }
}
