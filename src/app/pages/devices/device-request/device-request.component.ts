import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { NgbActiveModal, NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { Device } from "../Device";
import { Category } from "../../categories/Category";
import { CategoriesService } from "../../categories/categories.service";
import { Observable, Subject, merge } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  catchError,
  switchMap,
} from "rxjs/operators";
import { ToastService } from "src/app/toast/toast.service";
import { DevicesService } from "../devices.service";
import { LoadingService } from "src/app/loading/loading.service";

@Component({
  selector: "app-device-request",
  templateUrl: "./device-request.component.html",
  styleUrls: ["./device-request.component.scss"],
})
export class DeviceRequestComponent implements OnInit {
  @Output() updateList: EventEmitter<any> = new EventEmitter();

  @ViewChild("instanceFilterCategory", { static: true })
  instanceFilterCategory: NgbTypeahead;
  focusFilterCategory$ = new Subject<string>();
  clickFilterCategory$ = new Subject<string>();

  device: Device;
  title: string;

  constructor(
    public activeModal: NgbActiveModal,
    private devicesService: DevicesService,
    private categoriesService: CategoriesService,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.device = new Device();
  }

  formatterCategory = (category: Category): string => category?.name;

  clickFilterCategoryEvent($event, typeaheadInstance) {
    if (typeaheadInstance.isPopupOpen()) {
      this.clickFilterCategory$.next($event.target.value);
    }
  }

  searchCategory = (text$: Observable<string>): Observable<any[]> => {
    const debouncedText$ = text$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );

    return merge(
      debouncedText$,
      this.focusFilterCategory$,
      this.clickFilterCategory$
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

  saveDevice() {
    this.loadingService.setLoadingBoolean(true);

    this.devicesService.saveDevice(this.device).subscribe(
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
