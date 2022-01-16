import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Booking } from 'src/app/Models/booking.model';
import { Bookinglogs } from 'src/app/Models/bookinglogs.model';
import { Feedback } from 'src/app/Models/feedback.model';
import { Payment } from 'src/app/Models/payment.model';
import { BookingService } from 'src/app/services/booking.service';
import { BookinglogsService } from 'src/app/services/bookinglogs.service';
import { CustomerService } from 'src/app/services/customer.service';
import { DriverService } from 'src/app/services/driver.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css']
})
export class BookingDetailComponent implements OnInit {

  public booking: Booking;
  public editBookingObj: Booking;
  public isLoading: boolean = false;
  public paymentObj: Payment;
  public totaldays: number = 0;
  public totalPrice: number = 0;

  public bookingLogs: Bookinglogs[] = [];

  feedbackObj: Feedback = {
    id: 0,
    bookingId: 0,
    rating: 0,
    comment: '',
    dateAdded: new Date().toISOString(),
    dateUpdated: new Date().toISOString(),
  };

  rating3: number;
  public form = new FormGroup({
    rating1: new FormControl('', [Validators.required]),
    rating2: new FormControl(''),
  });

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


    this.rating3 = 0;

  }

  ngOnInit(): void {
    this.getBookingLogs(this.booking.id);
    this.getPaymentByBookingId(this.booking.id);

    if (this.booking) {
      // To calculate the time difference of two dates
      var Difference_In_Time = new Date(this.booking.endDate).getTime() - new Date(this.booking.startDate).getTime();

      // To calculate the no. of days between two dates
      this.totaldays = Difference_In_Time / (1000 * 3600 * 24);

      if (this.totaldays == 0) {
        this.totaldays = 1;
      }

      this.totalPrice = this.totaldays * this.booking.vehicle.price;
    }
  }

  getPaymentByBookingId(bookingId: number) {
    this.paymentService.getByBookingId(bookingId).subscribe(
      (response: any) => {
        this.paymentObj = response;
        console.log(this.paymentObj)
      },
      (error: any) => {
        console.log("Error: ", error);
      }
    );
  }

  bookingFeedback() {
    this.feedbackObj.bookingId = this.booking.id;
    this.feedbackObj.rating = 2.5;
    this.feedbackObj.comment = 'this is comment';

    // this.feedbackService.add(this.feedbackObj).subscribe(
    //   (response: any) => {
    //     console.log(response)
    //     this.bookingLogs.push(response);
    //   },
    //   (error: any) => {
    //     console.log("Error: ", error);
    //   }
    // );
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

}
