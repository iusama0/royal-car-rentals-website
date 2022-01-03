import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Bookinglogs } from '../Models/bookinglogs.model';

@Injectable({
  providedIn: 'root'
})
export class BookinglogsService {
  readonly baseUrl = environment.apiUrl + "bookingLog";
  constructor(private http: HttpClient) { }

  add(data: Bookinglogs) {
    return this.http.post(this.baseUrl, data);
  }

  edit(data: Bookinglogs) {
    return this.http.put(this.baseUrl + "/" + data.id, data);
  }

  delete(data: Bookinglogs) {
    return this.http.delete(this.baseUrl + "/" + data.id);
  }

  get(data: Bookinglogs) {
    return this.http.get(this.baseUrl + "/" + data.id);
  }

  getByBookingId(id: number) {
    return this.http.get(this.baseUrl + "/bybookingid/" + id);
  }

  gets() {
    return this.http.get(this.baseUrl);
  }
}
