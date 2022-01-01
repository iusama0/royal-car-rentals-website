import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Booking } from '../Models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  readonly baseUrl = environment.apiUrl +  "Booking";
  public timeSlots = [
    {
      id: 1, text: '12:00 AM'
    },
    {
      id: 2, text: '01:00 AM'
    },
    {
      id: 3, text: '02:00 AM'
    },
    {
      id: 4, text: '03:00 AM'
    },
    {
      id: 5, text: '04:00 AM'
    },
    {
      id: 6, text: '05:00 AM'
    },
    {
      id: 7, text: '06:00 AM'
    },
    {
      id: 8, text: '07:00 AM'
    },
    {
      id: 9, text: '08:00 AM'
    },
    {
      id: 10, text: '09:00 AM'
    },
    {
      id: 11, text: '10:00 AM'
    },
    {
      id: 12, text: '11:00 AM'
    },
    {
      id: 13, text: '12:00 PM'
    },
    {
      id: 14, text: '01:00 PM'
    },
    {
      id: 15, text: '02:00 PM'
    },
    {
      id: 16, text: '03:00 PM'
    },
    {
      id: 17, text: '04:00 PM'
    },
    {
      id: 18, text: '05:00 PM'
    },
    {
      id: 19, text: '06:00 PM'
    },
    {
      id: 20, text: '07:00 PM'
    },
    {
      id: 21, text: '08:00 PM'
    },
    {
      id: 22, text: '09:00 PM'
    },
    {
      id: 23, text: '10:00 PM'
    },
    {
      id: 24, text: '11:00 PM'
    }
  ];
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

  counts() {
    return this.http.get(this.baseUrl + "/allcounts");
  }

  customerBookingsCounts(id: number) {
    return this.http.get(this.baseUrl + "/customercounts" + "/" + id);
  }

  getCustomerBookings(id: number) {
    return this.http.get(this.baseUrl + "/customerbookings" + "/" + id);
  }

  driverBookingsCounts(id: number) {
    return this.http.get(this.baseUrl + "/drivercounts" + "/" + id);
  }

  getDriverBookings(id: number) {
    return this.http.get(this.baseUrl + "/driverbookings" + "/" + id);
  }
}
