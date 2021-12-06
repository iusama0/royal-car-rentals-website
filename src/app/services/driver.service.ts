import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Driver } from '../Models/driver.model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  readonly baseUrl = environment.apiUrl + "Driver";
  constructor(private http: HttpClient) { }

  add(data: FormData) {
    return this.http.post(this.baseUrl, data);
  }

  edit(id: number, data: FormData) {
    return this.http.put(this.baseUrl + "/" + id, data);
  }

  delete(data: Driver) {
    return this.http.delete(this.baseUrl + "/" + data.id);
  }

  get(data: Driver) {
    return this.http.get(this.baseUrl + "/" + data.id);
  }

  searchByCityId(cityId: number) {
    return this.http.get(this.baseUrl + "/searchbycity/" + cityId);
  }

  gets() {
    return this.http.get(this.baseUrl);
  }

  counts() {
    return this.http.get(this.baseUrl + "/counts");
  }
}
