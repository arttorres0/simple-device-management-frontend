import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Category } from "./Category";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  private categoriesUrl = environment.serverUrl + "/categories";

  constructor(private http: HttpClient) {}

  getCategoriesList({
    filterName,
    page,
  }: {
    filterName?: string;
    page?: number;
  }): Observable<any> {
    let dataRequest = {};

    if (filterName) dataRequest["name"] = filterName;
    if (page) dataRequest["page"] = page;

    let params = new HttpParams({ fromObject: dataRequest });

    return this.http.get(this.categoriesUrl, { params });
  }

  saveCategory(category: Category): Observable<any> {
    let body = {
      name: category.name,
    };

    return this.http.post(this.categoriesUrl, body);
  }

  deleteCategory(category: Category): Observable<any> {
    return this.http.delete(this.categoriesUrl + "/" + category.id);
  }
}
