import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VehicleMaker } from '../Models/vehicle-maker.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleMakerService {
  readonly baseUrl = "http://localhost:25271/api/VehicleMaker";
  constructor(private http: HttpClient) { }

  add(data: VehicleMaker) {
    return this.http.post(this.baseUrl, data);
  }

  edit(data: VehicleMaker) {
    return this.http.put(this.baseUrl + "/" + data.id, data);
  }

  delete(data: VehicleMaker) {
    return this.http.delete(this.baseUrl + "/" + data.id);
  }

  get(data: VehicleMaker) {
    return this.http.get(this.baseUrl + "/" + data.id);
  }

  gets() {
    return this.http.get(this.baseUrl);
  }
}
