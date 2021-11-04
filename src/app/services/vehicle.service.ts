import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '../Models/vehicle.model';
import { map, catchError } from 'rxjs/operators';
import { from, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  readonly baseUrl = "http://localhost:25271/api/Vehicle";
  constructor(private http: HttpClient) { }

  addVehicle(data: FormData) {
    return this.http.post(this.baseUrl, data).
      pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return throwError('Something went wrong!');
        })
      );
    // return this.http.post(this.baseUrl, data);
  }

  uploadVehiclePicture(data: Vehicle, files: string[]) {

    const formData = new FormData();

    for (var i = 0; i < 3; i++) {
      formData.append("Files", files[i]);
    }

    formData.append("Info", JSON.stringify(data));

    return this.http.put(this.baseUrl + "/uploadpicture/" + data.id, formData);

    // return this.http.put(this.baseUrl + "/uploadpicture/" + data.id, formData).
    //   pipe(
    //     map((data) => {
    //       return data;
    //     }),
    //     catchError((error) => {
    //       return throwError('Something went wrong!');
    //     })
    //   ).toPromise();
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
  getVehiclesByMaker(makerId: number) {
    return this.http.get(this.baseUrl + "/bymaker/" + makerId);
  }
}
