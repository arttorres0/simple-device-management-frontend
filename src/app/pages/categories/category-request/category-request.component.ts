import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Category } from "../Category";
import { CategoriesService } from "../categories.service";
import { ToastService } from "src/app/toast/toast.service";
import { LoadingService } from "src/app/loading/loading.service";

@Component({
  selector: "app-category-request",
  templateUrl: "./category-request.component.html",
  styleUrls: ["./category-request.component.scss"],
})
export class CategoryRequestComponent implements OnInit {
  @Output() updateList: EventEmitter<any> = new EventEmitter();

  category: Category;
  title: string;

  constructor(
    public activeModal: NgbActiveModal,
    private categoriesService: CategoriesService,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.category = new Category();
  }

  saveCategory() {
    this.loadingService.setLoadingBoolean(true);

    this.categoriesService.saveCategory(this.category).subscribe(
      (response) => {
        this.updateList.next();
        this.toastService.success(response.message);
      },
      (error) => {
        this.loadingService.setLoadingBoolean(false);
        this.toastService.error(error.error.message);
      }
    );
  }
}
