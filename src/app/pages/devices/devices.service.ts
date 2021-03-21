import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DevicesService {
  private devicesUrl = environment.serverUrl + "/devices";

  constructor(private http: HttpClient) {}

  getDevicesList({
    categoryId,
    color,
    partNumber,
    page,
  }: {
    categoryId?: number;
    color?: string;
    partNumber?: number;
    page?: number;
  }): Observable<any> {
    let dataRequest = {};

    if (categoryId) dataRequest["categoryId"] = categoryId;
    if (color) dataRequest["color"] = color;
    if (partNumber) dataRequest["partNumber"] = partNumber;
    page ? (dataRequest["page"] = page) : (dataRequest["page"] = 1);

    let params = new HttpParams({ fromObject: dataRequest });

    return this.http.get(this.devicesUrl, { params });
  }
}
