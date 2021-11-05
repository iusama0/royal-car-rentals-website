import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from '../Models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  readonly baseUrl = "http://localhost:25271/api/Booking";
  constructor(private http: HttpClient) { }

  add(data: Booking) {
    return this.http.post(this.baseUrl, data);
  }

  edit(data: Booking) {
    return this.http.put(this.baseUrl + "/" + data.id, data);
  }

  delete(data: Booking) {
    return this.http.delete(this.baseUrl + "/" + data.id);
  }

  get(data: Booking) {
    return this.http.get(this.baseUrl + "/" + data.id);
  }

  gets() {
    return this.http.get(this.baseUrl);
  }
}
