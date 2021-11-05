import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/Models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-admin-customer',
  templateUrl: './admin-customer.component.html',
  styleUrls: ['./admin-customer.component.css']
})
export class AdminCustomerComponent implements OnInit {
  CustomerColumns: string[] = ['id', 'firstName', 'email', 'phoneNumber', 'licenceNo', 'gender', 'isActive', 'verificationStatus', 'dateAdded', 'dateUpdated', 'actions'];
  customers: MatTableDataSource<Customer>;
  @ViewChild('CustomerTable', { static: true }) customerTable: MatTable<Customer>;
  @ViewChild('CustomerPaginator', { static: true }) customerPaginator: MatPaginator;
  @ViewChild('CustomerSort', { static: true }) customerSort: MatSort;

  constructor(
    public customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.gets().subscribe(
      (response: any) => {
        this.customers = new MatTableDataSource(response);
        this.customers.paginator = this.customerPaginator;
        this.customers.sort = this.customerSort;
        // this.vehicleMakerTable.renderRows();
      },
      (error: any) => {
        console.log("Error: " + error);
      }
    );
  }

  viewCustomer(data: any) {
    let _data = JSON.stringify(data);
    this.router.navigate(["admin/customer-detail"], { queryParams: { _data } });
  }

}
