import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Driver } from '../Models/driver.model';
import { Signin } from '../Models/signin.model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  isDriverAuthenticated = new EventEmitter<boolean>();
  readonly baseUrl = environment.apiUrl + "Driver";
  constructor(private http: HttpClient) { }

  authentication(data: Signin) {
    return this.http.post(this.baseUrl + "/authentication", data);
  }

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
