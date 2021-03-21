import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

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
}
