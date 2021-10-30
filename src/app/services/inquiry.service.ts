import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inquiry } from '../Models/inquiry.model';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  readonly baseUrl = "http://localhost:25271/api/Inquiries";
  constructor(private http: HttpClient) { }

  add(data: Inquiry) {
    return this.http.post(this.baseUrl, data);
  }

  edit(data: Inquiry) {
    return this.http.put(this.baseUrl + "/" + data.id, data);
  }

  delete(data: Inquiry) {
    return this.http.delete(this.baseUrl + "/" + data.id);
  }

  get(data: Inquiry) {
    return this.http.get(this.baseUrl + "/" + data.id);
  }

  gets() {
    return this.http.get(this.baseUrl);
  }
}
