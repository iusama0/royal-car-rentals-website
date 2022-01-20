import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Booking } from 'src/app/Models/booking.model';
import { Bookinglogs } from 'src/app/Models/bookinglogs.model';
import { Feedback } from 'src/app/Models/feedback.model';
import { BookingService } from 'src/app/services/booking.service';
import { BookinglogsService } from 'src/app/services/bookinglogs.service';
import { CustomerService } from 'src/app/services/customer.service';
import { DriverService } from 'src/app/services/driver.service';
import { FeedbackService } from 'src/app/services/feedback.service';
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

  public bookingLogs: Bookinglogs[] = [];
  public feedbackData: Feedback[] = [];
  
  constructor(
    public bookinglogsService: BookinglogsService,
    public feedbackService: FeedbackService,
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
    this.getBookingLogs(this.booking.id);
    this.getFeedback(this.booking.id);
  }

  completeBooking(status: string) {
    this.editBookingObj = Object.assign({}, this.booking);
    this.editBookingObj.status = status;


    this.bookingService.edit(this.editBookingObj).subscribe(
      (response: any) => {
        this.booking = Object.assign({}, this.editBookingObj);

        var bookinglogs = new Bookinglogs();
        bookinglogs.bookingId = this.booking.id;

        var bookinglogs = new Bookinglogs();
        bookinglogs.bookingId = this.booking.id;

        if (this.booking.status == "pending") {
          bookinglogs.action = "pending";
          bookinglogs.description = "booking pending";
        }
        else if (this.booking.status == "approved") {
          bookinglogs.action = "approved";
          bookinglogs.description = "booking approved";
        }
        else if (this.booking.status == "cancelled") {
          bookinglogs.action = "cancelled";
          bookinglogs.description = "booking cancelled";
        }
        else if (this.booking.status == "completed") {
          bookinglogs.action = "completed";
          bookinglogs.description = "booking completed";
        }

        this.bookinglogsService.add(bookinglogs).subscribe(
          (response: any) => {
            console.log(response)
            this.bookingLogs.push(response);
          },
          (error: any) => {
            console.log("Error: ", error);
          }
        );

        this.toastr.success('', 'Booking Status Updated Successfully');
      },
      error => {
        this.isLoading = false;
        this.toastr.error('', 'Status Updating Error');
        console.log("Error: ", error);
      }
    );
  }

  getBookingLogs(id: number) {
    this.bookinglogsService.getByBookingId(id).subscribe(
      (response: any) => {
        this.bookingLogs = response;
      },
      (error: any) => {
        console.log("Error: ", error);
      }
    );
  }

  getFeedback(bookingId: number) {
    this.feedbackService.getByBookingId(bookingId).subscribe(
      (response: any) => {
        console.log(response)
        this.feedbackData = response;
      },
      error => {
        console.log("Error: ", error);
      }
    );
  }
}
