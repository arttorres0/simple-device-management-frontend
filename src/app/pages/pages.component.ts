import { Component, OnInit } from "@angular/core";
import { PagesRoutes } from "./PagesRoutes";

@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styleUrls: ["./pages.component.scss"],
})
export class PagesComponent implements OnInit {
  menuRoutes: object[];

  constructor() {}

  ngOnInit() {
    this.menuRoutes = PagesRoutes;
  }

  getRouterLink(route): string[] {
    return ["/" + route.path];
  }
}
