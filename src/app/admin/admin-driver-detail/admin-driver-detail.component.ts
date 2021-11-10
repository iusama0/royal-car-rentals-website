import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Driver } from 'src/app/Models/driver.model';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-admin-driver-detail',
  templateUrl: './admin-driver-detail.component.html',
  styleUrls: ['./admin-driver-detail.component.css']
})
export class AdminDriverDetailComponent implements OnInit {
  @ViewChild('firstname', { static: true }) firstname: any;
  @ViewChild('hideeditmodel') hideeditmodel: any;
  @ViewChild('showeditmodel') showeditmodel: any;


  public driver: Driver;
  public editDriverObj: Driver;
  public file: string = '';
  public isLoading: boolean = false;
  public hide = true;
  public editDriverForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern("^([a-zA-Z.]+((['.][a-zA-Z])?[a-zA-Z]*)*){2,30}$")]),
    lastName: new FormControl('', [Validators.required, Validators.pattern("^([a-zA-Z]+((['.][a-zA-Z])?[a-zA-Z]*)*){2,30}$")]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z][-_.a-zA-Z0-9]{2,29}@(yahoo|hotmail|gmail).com$")]),
    password: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9- ]{2,30}$")]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^((\\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$")]),
    isActive: new FormControl('', [Validators.required]),
    availability: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9-. ]{2,30}$")]),
    licenceNo: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9-. ]{2,30}$")]),
    profilePicture: new FormControl('')
  });

  optionsValue = [
    {
      value: true,
      text: "True"
    },
    {
      value: false,
      text: "False"
    }
  ];

  // profilePicture: new FormControl('')
  constructor(
    public driverService: DriverService,
    private toastr: ToastrService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.driver = JSON.parse(this.activatedRoute.snapshot.queryParams._data);
  }

  ngOnInit(): void {
    // console.log(this.editDriverObj)
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editDriverForm.controls[controlName].hasError(errorName);
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  showDriverEditModel() {
    this.editDriverObj = Object.assign({}, this.driver);
     
    this.editDriverForm.setValue({
      firstName: this.editDriverObj.firstName,
      lastName: this.editDriverObj.lastName,
      email: this.editDriverObj.email,
      password: this.editDriverObj.password,
      phoneNumber: this.editDriverObj.phoneNumber,
      isActive: this.editDriverObj.isActive,
      availability: this.editDriverObj.availability,
      address: this.editDriverObj.address,
      licenceNo: this.editDriverObj.licenceNo,
      profilePicture: null
    });
    // console.log(this.editDriverForm.value)
    this.showeditmodel.nativeElement.click();
    setTimeout(() => {
      // console.log('bbhjbhj');
      this.firstname.nativeElement.focus();
    }, 600);
  }

  edit(formValue: any, formDirective: FormGroupDirective) {
    this.isLoading = true;
    this.editDriverObj.firstName = formValue.firstName;
    this.editDriverObj.lastName = formValue.lastName;
    this.editDriverObj.email = formValue.email;
    this.editDriverObj.password = formValue.password;
    this.editDriverObj.phoneNumber = formValue.phoneNumber;
    this.editDriverObj.address = formValue.address;
    this.editDriverObj.availability = formValue.availability;
    this.editDriverObj.isActive = formValue.isActive;
    this.editDriverObj.licenceNo = formValue.licenceNo;


    const formData = new FormData();
    formData.append("Files", this.file);

    formData.append("Info", JSON.stringify(this.editDriverObj));

    this.driverService.edit(this.editDriverObj.id, formData).subscribe(
      (response: any) => {
        if (this.file != '') {
          let _data = JSON.stringify(response);
          this.router.navigate(["admin/driver-detail"], { queryParams: { _data } });
        } else {
          this.driver = this.editDriverObj = response;
        }

        this.hideeditmodel.nativeElement.click();
        this.toastr.success('', 'Driver Updated Successfully');
        this.resetForm(formDirective);
      },
      error => {
        this.isLoading = false;
        this.toastr.error('', 'Driver Updating Error');
        console.log("Error: " + error);
      }
    );
  }

  resetForm(formDirective: FormGroupDirective) {
    this.isLoading = false;
    formDirective.resetForm();
    this.editDriverObj = new Driver();
    this.file = '';
  }

  removePicture() {

  }

}
