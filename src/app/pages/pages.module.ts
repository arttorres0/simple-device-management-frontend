import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { CategoriesListComponent } from "./categories/categories-list/categories-list.component";

@NgModule({
  declarations: [PagesComponent, CategoriesListComponent],
  imports: [CommonModule, PagesRoutingModule, NgbModule, FormsModule],
})
export class PagesModule {}
