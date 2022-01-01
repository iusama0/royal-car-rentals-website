import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Driver } from 'src/app/Models/driver.model';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.css']
})
export class DriverDashboardComponent implements OnInit {
  public counts: any;
  public driver: Driver;
  constructor(
    public bookingService: BookingService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.driver = JSON.parse(localStorage.getItem('signindriverinfo') || 'null');
   }

  ngOnInit(): void {
    this.getCounts();
  }

  getCounts() {
    this.bookingService.driverBookingsCounts(this.driver.id).subscribe(
      (response: any) => {
        this.counts = response;
      },
      (error: any) => {
        console.log("Error: " , error);
      }
    )
  }

}
