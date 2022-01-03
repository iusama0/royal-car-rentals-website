import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Booking } from 'src/app/Models/booking.model';
import { Bookinglogs } from 'src/app/Models/bookinglogs.model';
import { BookingService } from 'src/app/services/booking.service';
import { BookinglogsService } from 'src/app/services/bookinglogs.service';

@Component({
  selector: 'app-admin-bookings',
  templateUrl: './admin-bookings.component.html',
  styleUrls: ['./admin-bookings.component.css']
})
export class AdminBookingsComponent implements OnInit {
  BookingColumns: string[] = ['vehicleId', 'customerId', 'withDriver', 'status', 'startTime', 'endTime', 'dateAdded', 'dateUpdated', 'actions'];
  bookings: MatTableDataSource<Booking>;
  @ViewChild('BookingTable', { static: true }) bookingTable: MatTable<Booking>;
  @ViewChild('BookingPaginator', { static: true }) bookingPaginator: MatPaginator;
  @ViewChild('BookingSort', { static: true }) bookingSort: MatSort;

  public counts: any;

  constructor(
    public bookingService: BookingService,
    public bookinglogsService: BookinglogsService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCounts();
    this.getBookings();
  }

  getCounts() {
    this.bookingService.counts().subscribe(
      (response: any) => {
        this.counts = response;
        console.log(this.counts)
      },
      (error: any) => {
        console.log("Error: ", error);
      }
    )
  }
  getBookings() {
    this.bookingService.gets().subscribe(
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
    this.router.navigate(["admin/booking-detail"], { queryParams: { _data } });
  }

}
