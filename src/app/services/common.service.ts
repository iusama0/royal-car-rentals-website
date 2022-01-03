import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public bookingActions = ['created', 'pending', 'assigned', 'approved', 'cancelled', 'completed', 'feedback'];
  readonly baseUrl = environment.apiUrl + "Dashboard";
  constructor(
    private http: HttpClient
  ) { }

  dashboardCounts() {
    return this.http.get(this.baseUrl + "/counts");
  }

  settingCounts() {
    return this.http.get(this.baseUrl + "/settingcounts");
  }
}
