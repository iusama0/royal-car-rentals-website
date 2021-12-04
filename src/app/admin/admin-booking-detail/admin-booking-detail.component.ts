import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Booking } from 'src/app/Models/booking.model';
import { BookingService } from 'src/app/services/booking.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-admin-booking-detail',
  templateUrl: './admin-booking-detail.component.html',
  styleUrls: ['./admin-booking-detail.component.css']
})
export class AdminBookingDetailComponent implements OnInit {
  @ViewChild('hideeditmodel') hideeditmodel: any;
  booking: Booking;
  editBookingObj: Booking;

  constructor(
    public customerService: CustomerService,
    public bookingService: BookingService,
    public activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.booking = JSON.parse(this.activatedRoute.snapshot.queryParams._data);
    console.log(this.booking)
    this.editBookingObj = Object.assign({}, this.booking);
  }

  ngOnInit(): void {



  }

  changeStatus(form: NgForm) {

    this.bookingService.edit(this.editBookingObj).subscribe(
      (response: any) => {
        this.booking = this.editBookingObj;
        this.hideeditmodel.nativeElement.click();
        this.toastr.success('', 'Booking Status Updated Successfully');
      },
      error => {
        form.form.reset();
        this.toastr.error('', 'Status Updating Error');
        console.log("Error: " , error);
      }
    );
  }

}
