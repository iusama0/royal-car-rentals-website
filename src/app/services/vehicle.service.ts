import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '../Models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  readonly baseUrl = "http://localhost:25271/api/Vehicle";
  constructor(private http: HttpClient) { }

  addVehicle(data: FormData) {
    return this.http.post(this.baseUrl, data);
  }

  uploadVehiclePicture(id: number, data: FormData) {
    return this.http.put(this.baseUrl + "/" + id, data);
  }

  removeVehiclePicture(id: number, data: string) {
    return this.http.put(this.baseUrl + "/" + id, data);
  }

  editVehicle(data: Vehicle) {
    return this.http.put(this.baseUrl + "/" + data.id, data);
  }

  deleteVehicle(data: Vehicle) {
    return this.http.delete(this.baseUrl + "/" + data.id);
  }

  getVehicle(data: Vehicle) {
    return this.http.get(this.baseUrl + "/" + data.id);
  }

  getVehicles() {
    return this.http.get(this.baseUrl);
  }
}
