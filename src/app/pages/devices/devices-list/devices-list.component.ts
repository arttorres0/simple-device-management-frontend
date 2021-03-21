import { Component, OnInit, ViewChild } from "@angular/core";
import { DevicesService } from "../devices.service";
import { LoadingService } from "src/app/loading/loading.service";
import { ToastService } from "src/app/toast/toast.service";
import { NgbTypeahead, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, Subject, merge } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  map,
  filter,
} from "rxjs/operators";
import { CategoriesService } from "../../categories/categories.service";
import { Category } from "../../categories/Category";
import { Device } from "../Device";
import { DeviceRequestComponent } from "../device-request/device-request.component";

@Component({
  selector: "app-devices-list",
  templateUrl: "./devices-list.component.html",
  styleUrls: ["./devices-list.component.scss"],
})
export class DevicesListComponent implements OnInit {
  devices: Device[];
  prevPage: number;
  page: number;
  pageSize: number;
  numberOfResults: number;
  selectedFilterCategory: Category;
  prevSelectedFilterCategory: Category;
  selectedFilterColor: string;
  selectedFilterPartNumber: number;

  @ViewChild("instanceFilterCategory", { static: true })
  instanceFilterCategory: NgbTypeahead;
  focusFilterCategory$ = new Subject<string>();
  clickFilterCategory$ = new Subject<string>();

  constructor(
    private devicesService: DevicesService,
    private categoriesService: CategoriesService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.selectedFilterCategory = this.prevSelectedFilterCategory = undefined;
    this.page = this.prevPage = 1;
    this.getDevicesList();
  }

  ngDoCheck() {
    if (
      this.page !== this.prevPage ||
      this.selectedFilterCategory?.id !== this.prevSelectedFilterCategory?.id
    ) {
      this.getDevicesList();
      this.prevPage = this.page;
      this.prevSelectedFilterCategory = this.selectedFilterCategory;
    }
  }

  getDevicesList(): void {
    this.loadingService.setLoadingBoolean(true);

    this.devicesService
      .getDevicesList({
        categoryId: this.selectedFilterCategory?.id,
        color: this.selectedFilterColor,
        partNumber: this.selectedFilterPartNumber,
        page: this.page,
      })
      .subscribe(
        (response) => {
          this.devices = response.devices;
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

  formatterCategory = (category: Category): string => category.name;

  searchCategory = (text$: Observable<string>): Observable<any[]> => {
    const debouncedText$ = text$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.clickFilterCategory$.pipe(
      filter(() => !this.instanceFilterCategory.isPopupOpen())
    );

    return merge(
      debouncedText$,
      this.focusFilterCategory$,
      clicksWithClosedPopup$
    ).pipe(
      switchMap((term) =>
        this.categoriesService.getCategoriesList({ filterName: term }).pipe(
          map((response) => {
            return response.categories;
          }),
          catchError((error) => {
            this.toastService.error(error.error.message);
            return [];
          })
        )
      )
    );
  };

  clearCategory(): void {
    this.selectedFilterCategory = undefined;
  }

  deleteDevice(device): void {
    if (confirm("Are you sure you want to delete this device?")) {
      this.loadingService.setLoadingBoolean(true);

      this.devicesService.deleteDevice(device).subscribe(
        (response) => {
          this.toastService.success(response.message);
          this.getDevicesList();
        },
        (error) => {
          this.loadingService.setLoadingBoolean(false);
          this.toastService.error(error.error.message);
        }
      );
    }
  }

  openDeviceModal() {
    const modalRef = this.modalService.open(DeviceRequestComponent, {
      centered: true,
      size: "lg",
      scrollable: true,
    });
    modalRef.componentInstance.updateList.subscribe(() => {
      this.getDevicesList();
    });
  }
}
