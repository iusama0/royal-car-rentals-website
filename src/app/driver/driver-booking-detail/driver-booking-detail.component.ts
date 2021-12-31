import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Booking } from 'src/app/Models/booking.model';
import { BookingService } from 'src/app/services/booking.service';
import { CustomerService } from 'src/app/services/customer.service';
import { DriverService } from 'src/app/services/driver.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-driver-booking-detail',
  templateUrl: './driver-booking-detail.component.html',
  styleUrls: ['./driver-booking-detail.component.css']
})
export class DriverBookingDetailComponent implements OnInit {
  public booking: Booking;
  public editBookingObj: Booking;
  public isLoading: boolean = false;



  constructor(
    public customerService: CustomerService,
    public bookingService: BookingService,
    public activatedRoute: ActivatedRoute,
    public driverService: DriverService,
    public paymentService: PaymentService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.booking = JSON.parse(this.activatedRoute.snapshot.queryParams._data);
    console.log(this.booking)
   }

  ngOnInit(): void {
  }

}
