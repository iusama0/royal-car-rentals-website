import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
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

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {
    //default number of records per page
    pageLength: 10,
    //It can be simple or full_numbers
    pagingType: 'full_numbers',
    autoWidth: false,
    responsive: true,
    //select from drop down list to select number of records per page 
    lengthMenu: [10, 20, 30, 40],
    processing: true,
    columns: [
      { data: 'id', orderable: true },
      { data: 'firstName', orderable: true },
      { data: 'email', orderable: false },
      { data: 'phoneNumber', orderable: false },
      { data: 'isActive', orderable: true },
      { data: 'availability', orderable: true },
      { data: 'dateAdded', orderable: true },
      { data: 'action', orderable: false },
    ]
  };

  public drivers: Driver[];
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
    $(document).on('click', '.viewDriverC', function (this: any) {
      var _id = $(this).parents("tr").find(".vid").text();
      let data = _this.drivers.find(i => i.id == parseInt(_id));
      _this.viewDriver(data);
    });

    $(document).on('click', '.editDriverC', function (this: any) {
      var _id = $(this).parents("tr").find(".vid").text();
      let data = _this.drivers.find(i => i.id == parseInt(_id));
      _this.editDriver(data);
    });
    $(document).on('click', '.deleteDriverC', function (this: any) {
      var _id = $(this).parents("tr").find(".vid").text();
      let data = _this.drivers.find(i => i.id == parseInt(_id));
      _this.deleteDriver(data);
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  getDrivers() {
    this.driverService.gets().subscribe(
      (response: any) => {
        this.drivers = response
        this.rerender();
        console.log("Success: " + response);
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

        // this.drivers.(); remove vehicle
        // for (var i = 0; i < this.drivers.length; i++) {
        //   let obj = this.drivers[i];
        //   if (this.drivers.indexOf(obj) !== -1) {
        //     this.drivers.splice(i, 1);
        //   }
        // }

        this.rerender();
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
        this.drivers.push(response)
        this.rerender();
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
