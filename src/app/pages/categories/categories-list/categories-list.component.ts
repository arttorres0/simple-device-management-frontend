import { Component, OnInit } from "@angular/core";
import { LoadingService } from "src/app/loading/loading.service";
import { ToastService } from "src/app/toast/toast.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { CategoriesService } from "../categories.service";
import { Category } from "../Category";

@Component({
  selector: "app-categories-list",
  templateUrl: "./categories-list.component.html",
  styleUrls: ["./categories-list.component.scss"],
})
export class CategoriesListComponent implements OnInit {
  categories: Category[];
  prevPage: number;
  page: number;
  pageSize: number;
  numberOfResults: number;
  selectedFilterName: string;

  subject: Subject<null> = new Subject();

  constructor(
    private categoriesService: CategoriesService,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) {
    this.subject
      .pipe(debounceTime(500))
      .subscribe(() => this.getCategoriesList());
  }

  ngOnInit() {
    this.selectedFilterName = "";
    this.page = this.prevPage = 1;
    this.getCategoriesList();
  }

  getCategoriesList(): void {
    this.loadingService.setLoadingBoolean(true);

    this.categoriesService
      .getCategoriesList({
        filterName: this.selectedFilterName,
        page: this.page,
      })
      .subscribe(
        (response) => {
          this.categories = response.categories;
          this.numberOfResults = response.numberOfResults;
          this.page = Number(response.page);
          this.pageSize = response.pageSize;
          this.loadingService.setLoadingBoolean(false);
        },
        (error) => {
          this.loadingService.setLoadingBoolean(false);
          this.toastService.error(error.error.message);
        }
      );
  }

  clearCategory(): void {
    this.selectedFilterName = "";
    this.getCategoriesList();
  }
}
