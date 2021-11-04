import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Driver } from 'src/app/Models/driver.model';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-admin-driver',
  templateUrl: './admin-driver.component.html',
  styleUrls: ['./admin-driver.component.css']
})
export class AdminDriverComponent implements OnInit {
  @ViewChild('hideaddmodel') hideaddmodel: any;
  @ViewChild('showdeletemodel') showdeletemodel: any;
  @ViewChild('hidedeletemodel') hidedeletemodel: any;

  DriverColumns: string[] = ['id', 'firstName', 'email', 'phoneNumber', 'isActive', 'availability','dateAdded', 'dateUpdated', 'actions'];
  drivers: MatTableDataSource<Driver>;
  @ViewChild('DriverTable', { static: true }) driverTable: MatTable<Driver>;
  @ViewChild('DriverPaginator', { static: true }) driverPaginator: MatPaginator;
  @ViewChild('DriverSort', { static: true }) driverSort: MatSort;
  public deleteInfo: Driver;
  public newDriver: Driver = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    isActive: false,
    availability: false,
    address: '',
    licenceNo: '',
    profilePicture: '',
    dateAdded: new Date().toISOString(),
    dateUpdated: new Date().toISOString()
  };
  file: string = '';

  constructor(
    public driverService: DriverService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDrivers();
    let _this = this;
    // $(document).on('click', '.viewDriverC', function (this: any) {
    //   var _id = $(this).parents("tr").find(".vid").text();
    //   let data = _this.drivers.find(i => i.id == parseInt(_id));
    //   _this.viewDriver(data);
    // });

    // $(document).on('click', '.editDriverC', function (this: any) {
    //   var _id = $(this).parents("tr").find(".vid").text();
    //   let data = _this.drivers.find(i => i.id == parseInt(_id));
    //   _this.editDriver(data);
    // });
    // $(document).on('click', '.deleteDriverC', function (this: any) {
    //   var _id = $(this).parents("tr").find(".vid").text();
    //   let data = _this.drivers.find(i => i.id == parseInt(_id));
    //   _this.deleteDriver(data);
    // });
  }

  ngAfterViewInit(): void {

  }


  getDrivers() {
    this.driverService.gets().subscribe(
      (response: any) => {
        this.drivers = new MatTableDataSource(response);
        this.drivers.paginator = this.driverPaginator;
        this.drivers.sort = this.driverSort;
        // this.vehicleMakerTable.renderRows();
      },
      (error: any) => {
        console.log("Error: " + error);
      }
    );
  }


  viewDriver(data: any) {
    let _data = JSON.stringify(data);
    this.router.navigate(["admin/driver-detail"], { queryParams: { _data } });
  }

  editDriver(data: any) {
    console.log("editDriver")
    console.log(data)
  }

  deleteDriver(data: any) {
    console.log(data)
    this.deleteInfo = data;
    this.showdeletemodel.nativeElement.click();

  }

  confirmDelete() {
    console.log("confirmDeleteDriver: " + this.deleteInfo)
    this.driverService.delete(this.deleteInfo).subscribe(
      (response: any) => {

        for (var i = 0; i < this.drivers.data.length; i++) {
          if (this.drivers.data[i].id == this.deleteInfo.id) {
            this.drivers.data.splice(i, 1);
          }
        }

        this.drivers.paginator = this.driverPaginator;
        this.drivers.sort = this.driverSort;
        this.driverTable.renderRows();

        this.hidedeletemodel.nativeElement.click();
        this.toastr.success('', 'Driver Deleted Successfully');
      },
      error => {
        this.toastr.error('', 'Error Driver Deleting');
        console.log("Error: " + error);
      }
    );
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  addDriver(form: NgForm) {
    console.log(this.newDriver)

    const formData = new FormData();
    formData.append("Files", this.file);

    formData.append("Info", JSON.stringify(this.newDriver));

    this.driverService.add(formData).subscribe(
      (response: any) => {
        this.drivers.data.push(response)
        this.drivers.paginator = this.driverPaginator;
        this.drivers.sort = this.driverSort;
        this.driverTable.renderRows();
        this.resetForm(form);
        this.hideaddmodel.nativeElement.click();
        this.toastr.success('', 'Driver Added Successfully');
      },
      error => {
        form.form.reset();
        this.toastr.error('', 'Driver Adding Error');
        console.log("Error: " + error);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    // this.uploadImagesInput.nativeElement.value = '';
    this.newDriver = new Driver();
    this.newDriver.availability = false;
    this.newDriver.isActive = true;
    this.newDriver.dateAdded = new Date().toISOString();
    this.newDriver.dateUpdated = new Date().toISOString();

    this.file = '';
  }
}
