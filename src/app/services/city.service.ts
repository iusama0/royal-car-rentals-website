import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { City } from '../Models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  readonly baseUrl = environment.apiUrl +  "City";
  constructor(private http: HttpClient) { }

  add(data: City) {
    return this.http.post(this.baseUrl, data);
  }

  edit(data: City) {
    return this.http.put(this.baseUrl + "/" + data.id, data);
  }

  delete(data: City) {
    return this.http.delete(this.baseUrl + "/" + data.id);
  }

  get(data: City) {
    return this.http.get(this.baseUrl + "/" + data.id);
  }

  gets() {
    return this.http.get(this.baseUrl);
  }
}
