import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Payment } from '../Models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  readonly baseUrl = environment.apiUrl + "Payment";
  constructor(private http: HttpClient) { }

  add(data: Payment) {
    return this.http.post(this.baseUrl, data);
  }

  edit(data: Payment) {
    return this.http.put(this.baseUrl + "/" + data.id, data);
  }

  delete(data: Payment) {
    return this.http.delete(this.baseUrl + "/" + data.id);
  }

  get(data: Payment) {
    return this.http.get(this.baseUrl + "/" + data.id);
  }

  getByBookingId(bookingId: number) {
    return this.http.get(this.baseUrl + "/getbybookingid/" + bookingId);
  }

  gets() {
    return this.http.get(this.baseUrl);
  }
}
