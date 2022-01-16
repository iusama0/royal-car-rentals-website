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
  BookingColumns: string[] = ['vehicleId', 'customerId', 'withDriver', 'status', 'startTime', 'endTime', 'dateAdded', 'dateUpdated', 'actions'];
  bookings: MatTableDataSource<Booking>;
  @ViewChild('BookingTable', { static: true }) bookingTable: MatTable<Booking>;
  @ViewChild('BookingPaginator', { static: true }) bookingPaginator: MatPaginator;
  @ViewChild('BookingSort', { static: true }) bookingSort: MatSort;
  public counts: any;

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
        console.log("Error: ", error);
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
        console.log("Error: ", error);
      }
    );
  }

  viewBooking(data: any) {
    let _data = JSON.stringify(data);
    this.router.navigate(["public/booking-detail"], { queryParams: { _data } });
  }
}
