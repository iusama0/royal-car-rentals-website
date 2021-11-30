import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Booking } from 'src/app/Models/booking.model';
import { Customer } from 'src/app/Models/customer.model';
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

  public addBookingForm = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required])
  });

  bookingObj: Booking = {
    id: 0,
    customerId: 0,
    vehicleId: 0,
    driverId: 1,
    withDriver: true,
    status: 'pending',
    startDate: '',
    startTime: 0,
    endDate: '',
    endTime: 0,
    dateAdded: new Date().toISOString(),
    dateUpdated: new Date().toISOString()
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
    // console.log(this.activatedRoute.snapshot.queryParams.info);

    this.vehicle = JSON.parse(this.activatedRoute.snapshot.queryParams.info);
    this.registerCustomer = JSON.parse(localStorage.getItem('signincustomerinfo') || 'null');
    console.log(this.registerCustomer)

    if (this.vehicle.imagesPath != "" && this.vehicle.imagesPath != null) {
      this.images = this.vehicle.imagesPath.split(',');
    }
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
  }

  confirmBook(formValue: any, formDirective: FormGroupDirective) {

    if (this.registerCustomer) {
      this.bookingObj.customerId = this.registerCustomer.id;
      this.bookingObj.vehicleId = this.vehicle.id;
      this.bookingObj.startDate = formValue.startDate;
      this.bookingObj.startTime = formValue.startTime;
      this.bookingObj.endDate = formValue.endDate;
      this.bookingObj.endTime = formValue.endTime;
      console.log(this.bookingObj)

      this.bookingService.add(this.bookingObj).subscribe(
        (response: any) => {
          this.router.navigateByUrl("public/bookings");
        },
        error => {
          this.toastr.error('', 'Try again! Vehicle Booking Error');
          console.log("Error: " + error);
        }
      );
    }
    else {
      this.router.navigateByUrl("public/register");
    }

  }

}
