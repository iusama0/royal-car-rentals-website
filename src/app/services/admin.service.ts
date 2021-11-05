import { Injectable } from '@angular/core';
import { Admin } from '../Models/admin.model';
import { HttpClient } from '@angular/common/http';
import { Signin } from '../Models/signin.model';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  isAuthenticated = new EventEmitter<boolean>();

  readonly baseUrl = "http://localhost:25271/api/Admin/";
  constructor(private http: HttpClient) { }

  authentication(data: Signin) {
    return this.http.post(this.baseUrl + "authentication", data);
  }
}
