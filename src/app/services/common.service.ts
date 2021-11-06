import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  readonly baseUrl = "http://localhost:25271/api/Dashboard";
  constructor(
    private http: HttpClient
  ) { }

  dashboardCounts() {
    return this.http.get(this.baseUrl + "/counts");
  }

  settingCounts(){
    return this.http.get(this.baseUrl + "/settingcounts");
  }
}
