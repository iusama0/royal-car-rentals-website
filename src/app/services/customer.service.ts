import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Customer } from '../Models/customer.model';
import { Signin } from '../Models/signin.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  isAuthenticatedCustomer = new EventEmitter<boolean>();

  readonly baseUrl = "http://localhost:25271/api/Customer";
  constructor(private http: HttpClient) { }

  add(data: FormData) {
    return this.http.post(this.baseUrl, data);
  }

  edit(id: number, data: FormData) {
    return this.http.put(this.baseUrl + "/" + id, data);
  }

  delete(data: Customer) {
    return this.http.delete(this.baseUrl + "/" + data.id);
  }

  get(data: Customer) {
    return this.http.get(this.baseUrl + "/" + data.id);
  }

  gets() {
    return this.http.get(this.baseUrl);
  }

  counts(){
    return this.http.get(this.baseUrl + "/counts");
  }

  signIn(data: Signin){
    return this.http.post(this.baseUrl + "/signin", data);
  }

  signUp(data: Customer){
    return this.http.post(this.baseUrl + "/signup", data);
  }
}
