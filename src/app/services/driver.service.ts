import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Driver } from '../Models/driver.model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  readonly baseUrl = "http://localhost:25271/api/Driver";
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

  gets() {
    return this.http.get(this.baseUrl);
  }
}
