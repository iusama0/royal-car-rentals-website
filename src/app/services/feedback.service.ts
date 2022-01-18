import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Feedback } from '../Models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  readonly baseUrl = environment.apiUrl +  "feedback";
  constructor(private http: HttpClient) { }

  add(data: Feedback) {
    return this.http.post(this.baseUrl, data);
  }

  edit(data: Feedback) {
    return this.http.put(this.baseUrl + "/" + data.id, data);
  }

  delete(data: Feedback) {
    return this.http.delete(this.baseUrl + "/" + data.id);
  }

  get(data: Feedback) {
    return this.http.get(this.baseUrl + "/" + data.id);
  }

  getByBookingId(id: number) {
    return this.http.get(this.baseUrl + "/getbybookingid/" + id);
  }

  gets() {
    return this.http.get(this.baseUrl);
  }
}
