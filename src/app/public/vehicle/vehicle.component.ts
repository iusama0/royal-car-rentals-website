import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Booking } from 'src/app/Models/booking.model';
import { Customer } from 'src/app/Models/customer.model';
import { Driver } from 'src/app/Models/driver.model';
import { Vehicle } from 'src/app/Models/vehicle.model';
import { BookingService } from 'src/app/services/booking.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  registerCustomer: Customer;
  vehicle: Vehicle;
  editVehicleObj: Vehicle;
  images: string[] = [];
  startMinDate: Date;
  endMinDate: Date;
  disabledvalue = "hjk";
  timeSlots = [
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
  ]

  timeSlotsFilter: any;
  totaldays: number = 0;
  totalPrice: number = 0;

  public addBookingForm = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required]),
    withDriver: new FormControl(false)
  });

  bookingObj: Booking = {
    id: 0,
    customerId: 0,
    vehicleId: 0,
    driverId: 1,
    withDriver: false,
    status: 'pending',
    startDate: '',
    startTime: 0,
    endDate: '',
    endTime: 0,
    dateAdded: new Date().toISOString(),
    dateUpdated: new Date().toISOString(),
    customer: new Customer,
    driver: new Driver,
    vehicle: new Vehicle
  };


  constructor(
    public vehicleService: VehicleService,
    public bookingService: BookingService,
    private toastr: ToastrService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.startMinDate = new Date();
    this.endMinDate = new Date();
  }

  ngOnInit(): void {

    this.vehicle = JSON.parse(this.activatedRoute.snapshot.queryParams.info);
    this.registerCustomer = JSON.parse(localStorage.getItem('signincustomerinfo') || 'null');

    if (this.vehicle.imagesPath != "" && this.vehicle.imagesPath != null) {
      this.images = this.vehicle.imagesPath.split(',');
    }

    let todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    this.addBookingForm.setValue({
      startDate: todayDate,
      startTime: 10,
      endDate: todayDate,
      endTime: 11,
      withDriver: false
    });
    this.changeEndTime(10);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addBookingForm.controls[controlName].hasError(errorName);
  }

  changeStartDate(event: MatDatepickerInputEvent<Date>) {
    var year = event.value?.getFullYear()!;
    var month = event.value?.getMonth()!;
    var date = event.value?.getDate()!;
    var day = event.value?.getDay()!;


    this.endMinDate = new Date(year, month, date);

    if (new Date(this.addBookingForm.value.startDate).getDate() > new Date(this.addBookingForm.value.endDate).getDate()) {
      let setDate = new Date(this.endMinDate);
      setDate.setHours(0, 0, 0, 0);

      this.addBookingForm.controls.endDate.setValue(setDate);
    }

    // To calculate the time difference of two dates
    var Difference_In_Time = new Date(this.addBookingForm.value.endDate).getTime() - new Date(this.addBookingForm.value.startDate).getTime();

    // To calculate the no. of days between two dates
    this.totaldays = Difference_In_Time / (1000 * 3600 * 24);

    if (this.totaldays == 0) {
      this.totaldays = 1;
    }

    this.totalPrice = this.totaldays * this.vehicle.price;
  }

  changeEndDate(event: MatDatepickerInputEvent<Date>) {
    this.changeEndTime(this.addBookingForm.value.endTime);

    // To calculate the time difference of two dates
    var Difference_In_Time = new Date(this.addBookingForm.value.endDate).getTime() - new Date(this.addBookingForm.value.startDate).getTime();

    // To calculate the no. of days between two dates
    this.totaldays = Difference_In_Time / (1000 * 3600 * 24);
    if (this.totaldays == 0) {
      this.totaldays = 1;
    }
    this.totalPrice = this.totaldays * this.vehicle.price;
  }

  confirmBook(formValue: any, formDirective: FormGroupDirective) {

    if (this.registerCustomer) {
      if (this.registerCustomer.verificationStatus == "pending" || this.registerCustomer.verificationStatus == "blocked") {
        this.toastr.error('Your verification status is pending. So you cannot booked vehicle right now.', 'Try again later!');
        return;
      }

      if (new Date(formValue.startDate).getDate() === new Date(formValue.endDate).getDate() && formValue.startTime == formValue.endTime) {
        this.toastr.error('', 'Select different start and end date time!');
        return;
      }

      if (!this.vehicle.availability) {
        this.toastr.error('This vehicle is already booked.', 'Try again later!');
        return;
      }

      this.bookingObj.customerId = this.registerCustomer.id;
      this.bookingObj.vehicleId = this.vehicle.id;
      this.bookingObj.startDate = formValue.startDate;
      this.bookingObj.startTime = formValue.startTime;
      this.bookingObj.endDate = formValue.endDate;
      this.bookingObj.endTime = formValue.endTime;
      this.bookingObj.withDriver = formValue.withDriver;
      // console.log(this.bookingObj)

      // To calculate the time difference of two dates
      var Difference_In_Time = new Date(formValue.endDate).getTime() - new Date(formValue.startDate).getTime();

      // To calculate the no. of days between two dates
      this.totaldays = Difference_In_Time / (1000 * 3600 * 24);
      if (this.totaldays == 0) {
        this.totaldays = 1;
      }
      this.totalPrice = this.totaldays * this.vehicle.price;

      this.bookingService.add(this.bookingObj).subscribe(
        (response: any) => {
          this.router.navigateByUrl("public/bookings");
        },
        error => {
          this.toastr.error('', 'Try again! Vehicle Booking Error');
          console.log("Error: " , error);
        }
      );
    }
    else {
      this.router.navigateByUrl("public/register");
    }

  }

  changeEndTime(data: number) {

    if (new Date(this.addBookingForm.value.startDate).getDate() === new Date(this.addBookingForm.value.endDate).getDate()) {
      this.timeSlotsFilter = this.timeSlots.filter(x => x.id > data);
    }
    else {
      this.timeSlotsFilter = this.timeSlots;
    }

    // To calculate the time difference of two dates
    var Difference_In_Time = new Date(this.addBookingForm.value.endDate).getTime() - new Date(this.addBookingForm.value.startDate).getTime();

    // To calculate the no. of days between two dates
    this.totaldays = Difference_In_Time / (1000 * 3600 * 24);
    if (this.totaldays == 0) {
      this.totaldays = 1;
    }
    this.totalPrice = this.totaldays * this.vehicle.price;
  }

}
