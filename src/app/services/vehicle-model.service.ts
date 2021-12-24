import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VehicleModel } from '../Models/vehicle-model.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleModelService {
  readonly baseUrl = environment.apiUrl + "VehicleModel";
  constructor(private http: HttpClient) { }

  add(data: VehicleModel) {
    return this.http.post(this.baseUrl, data);
  }

  edit(data: VehicleModel) {
    return this.http.put(this.baseUrl + "/" + data.id, data);
  }

  delete(data: VehicleModel) {
    return this.http.delete(this.baseUrl + "/" + data.id);
  }

  get(data: VehicleModel) {
    return this.http.get(this.baseUrl + "/" + data.id);
  }

  gets() {
    return this.http.get(this.baseUrl);
  }

  getByMakerId(id: number) {
    return this.http.get(this.baseUrl + "/getbymakerid/" + id);
  }
}
