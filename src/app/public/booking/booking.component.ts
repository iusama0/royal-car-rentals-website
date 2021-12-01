import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Booking } from 'src/app/Models/booking.model';
import { Customer } from 'src/app/Models/customer.model';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  BookingColumns: string[] = ['id', 'vehicleId', 'customerId', 'withDriver', 'status', 'startTime', 'endTime', 'dateAdded', 'dateUpdated', 'actions'];
  bookings: MatTableDataSource<Booking>;
  @ViewChild('BookingTable', { static: true }) bookingTable: MatTable<Booking>;
  @ViewChild('BookingPaginator', { static: true }) bookingPaginator: MatPaginator;
  @ViewChild('BookingSort', { static: true }) bookingSort: MatSort;
  public counts: any;

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
  ];
  registerCustomer: Customer;

  constructor(
    public bookingService: BookingService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerCustomer = JSON.parse(localStorage.getItem('signincustomerinfo') || 'null');
    this.getCounts();
    this.getBookings();
  }

  getCounts() {
    this.bookingService.customerBookingsCounts(this.registerCustomer.id).subscribe(
      (response: any) => {
        this.counts = response;
      },
      (error: any) => {
        console.log("Error: " + error);
      }
    )
  }

  getBookings() {
    this.bookingService.getCustomerBookings(this.registerCustomer.id).subscribe(
      (response: any) => {
        this.bookings = new MatTableDataSource(response);
        this.bookings.paginator = this.bookingPaginator;
        this.bookings.sort = this.bookingSort;
      },
      (error: any) => {
        console.log("Error: " + error);
      }
    );
  }

  viewBooking(data: any) {
    let _data = JSON.stringify(data);
    console.log(_data)
  }
}
