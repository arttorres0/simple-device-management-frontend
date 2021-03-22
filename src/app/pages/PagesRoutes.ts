import { CategoriesListComponent } from "./categories/categories-list/categories-list.component";
import { DevicesListComponent } from "./devices/devices-list/devices-list.component";

export const PagesRoutes = [
  {
    path: "categories",
    component: CategoriesListComponent,
    menuName: "Categories",
  },
  {
    path: "devices",
    component: DevicesListComponent,
    menuName: "Devices",
  },
];
