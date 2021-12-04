import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { City } from 'src/app/Models/city.model';
import { Driver } from 'src/app/Models/driver.model';
import { CityService } from 'src/app/services/city.service';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-admin-driver',
  templateUrl: './admin-driver.component.html',
  styleUrls: ['./admin-driver.component.css']
})
export class AdminDriverComponent implements OnInit {
  @ViewChild('firstname', { static: true }) firstname: any;
  @ViewChild('hideaddmodel') hideaddmodel: any;
  @ViewChild('showdeletemodel') showdeletemodel: any;
  @ViewChild('hidedeletemodel') hidedeletemodel: any;

  DriverColumns: string[] = ['id', 'firstName', 'email', 'phoneNumber', 'isActive', 'availability', 'dateAdded', 'dateUpdated', 'actions'];
  drivers: MatTableDataSource<Driver>;
  @ViewChild('DriverTable', { static: true }) driverTable: MatTable<Driver>;
  @ViewChild('DriverPaginator', { static: true }) driverPaginator: MatPaginator;
  @ViewChild('DriverSort', { static: true }) driverSort: MatSort;
  public deleteInfo: Driver;
  public newDriver: Driver = {
    id: 0,
    cityId: 0,
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
  public counts: any;
  public cities: City[];
  public isAlreadyEntered: boolean = false;
  public isLoading: boolean = false;
  public hide = true;

  public addDriverForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern("^([a-zA-Z.]+((['.][a-zA-Z])?[a-zA-Z]*)*){2,30}$")]),
    lastName: new FormControl('', [Validators.required, Validators.pattern("^([a-zA-Z]+((['.][a-zA-Z])?[a-zA-Z]*)*){2,30}$")]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z][-_.a-zA-Z0-9]{2,29}@(yahoo|hotmail|gmail).com$")]),
    password: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9- ]{2,30}$")]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^((\\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$")]),
    isActive: new FormControl('', [Validators.required]),
    availability: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9-., ]{2,30}$")]),
    licenceNo: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9-. ]{2,30}$")]),
    profilePicture: new FormControl(''),
    cityId: new FormControl('', [Validators.required]),
  });



  constructor(
    public driverService: DriverService,
    public cityService: CityService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCounts();
    this.getDrivers();
    this.getCities();
  }

  setFocus() {
    setTimeout(() => {
      console.log('bbhjbhj');
      this.firstname.nativeElement.focus();
    }, 600);
  }
  
  public hasError = (controlName: string, errorName: string) => {
    return this.addDriverForm.controls[controlName].hasError(errorName);
  }

  getCities() {
    this.cityService.gets().subscribe(
      (response: any) => {
        this.cities = response;
      },
      (error: any) => {
        console.log("Error: " , error);
      }
    );
  }

  getCounts() {
    this.driverService.counts().subscribe(
      (response: any) => {
        this.counts = response;
      },
      (error: any) => {
        console.log("Error: " , error);
      }
    )
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
        console.log("Error: " , error);
      }
    );
  }


  viewDriver(data: any) {
    let _data = JSON.stringify(data);
    this.router.navigate(["admin/driver-detail"], { queryParams: { _data } });
  }

  editDriver(data: any) {
    // console.log("editDriver")
    // console.log(data)
  }

  deleteDriver(data: any) {
    this.deleteInfo = data;
    this.showdeletemodel.nativeElement.click();

  }

  confirmDelete() {
    this.isLoading = true;

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
        this.isLoading = false;
        this.hidedeletemodel.nativeElement.click();
        this.toastr.success('', 'Driver Deleted Successfully');
      },
      error => {
        this.isLoading = false;
        this.toastr.error('', 'Error Driver Deleting');
        console.log("Error: " , error);
      }
    );
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  addDriver(formValue: any, formDirective: FormGroupDirective) {
    this.isLoading = true;


    var _data = this.drivers.data.filter(x => x.email.toLowerCase() == formValue.email.toLowerCase());
    if (_data.length > 0) {
      this.isLoading = false;
      this.isAlreadyEntered = true;
      return;
    } else {
      this.isAlreadyEntered = false;
    }

    console.log(formValue)
    this.newDriver.firstName = formValue.firstName;
    this.newDriver.lastName = formValue.lastName;
    this.newDriver.email = formValue.email;
    this.newDriver.password = formValue.password;
    this.newDriver.phoneNumber = formValue.phoneNumber;
    this.newDriver.address = formValue.address;
    this.newDriver.availability = formValue.availability;
    this.newDriver.isActive = formValue.isActive;
    this.newDriver.licenceNo = formValue.licenceNo;
    this.newDriver.cityId = formValue.cityId;

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
        this.resetForm(formDirective);
        this.hideaddmodel.nativeElement.click();
        this.toastr.success('', 'Driver Added Successfully');
      },
      error => {
        this.isAlreadyEntered = false;
        this.toastr.error('', 'Driver Adding Error');
        console.log("Error: " , error);
      }
    );
  }

  resetForm(formDirective: FormGroupDirective) {
    this.isAlreadyEntered = false;
    this.isLoading = false;
    formDirective.resetForm();
    this.newDriver = new Driver();
    this.file = '';
  }
}
