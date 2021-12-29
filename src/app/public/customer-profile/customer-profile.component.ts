import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangePassword } from 'src/app/Models/change-password.model';
import { Customer } from 'src/app/Models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
  @ViewChild('firstname', { static: true }) firstname: any;
  @ViewChild('hideeditmodel') hideeditmodel: any;
  @ViewChild('showeditmodel') showeditmodel: any;
  @ViewChild('hidepasswordmodel') hidepasswordmodel: any;

  signInCustomer: Customer;
  customerNewInfo: Customer;
  changePasswordObj: ChangePassword = {
    oldPassword: '',
    newPassword: '',
    isResetPassword: false
  }

  public isLoading: boolean = false;
  public oldHide = true;
  public newHide = true;
  public confirmHide = true;
  public file: string = '';

  public customerNewInfoForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern("^([a-zA-Z.]+((['.][a-zA-Z])?[a-zA-Z]*)*){2,30}$")]),
    lastName: new FormControl('', [Validators.required, Validators.pattern("^([a-zA-Z]+((['.][a-zA-Z])?[a-zA-Z]*)*){2,30}$")]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z][-_.a-zA-Z0-9]{2,29}@(yahoo|hotmail|gmail).com$")]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^((\\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$")]),
    licenceNo: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9-. ]{2,30}$")]),
    address: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9-.,# ]{2,30}$")]),
    gender: new FormControl('male'),
    profilePicture: new FormControl('')
  });

  public changePasswordForm = new FormGroup({
    oldpassword: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9-.@_ ]{2,30}$")]),
    newpassword: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9-.@_ ]{2,30}$")]),
    confirmPassword: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9-.@_ ]{2,30}$")])
  });


  constructor(
    public customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.signInCustomer = JSON.parse(localStorage.getItem('signincustomerinfo') || 'null');
    this.getCustomer();
  }

  ngOnInit(): void {

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.customerNewInfoForm.controls[controlName].hasError(errorName)
  }

  public hasErrorPassword = (controlName: string, errorName: string) => {
    return this.changePasswordForm.controls[controlName].hasError(errorName)
  }

  getCustomer() {
    this.customerService.get(this.signInCustomer).subscribe(
      (response: any) => {
        this.signInCustomer = Object.assign({}, response);
        localStorage.setItem('signincustomerinfo', JSON.stringify(response));
      },
      (error: any) => {
        console.log("Error: ", error);
      }
    );
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  showDEditModel() {
    this.customerNewInfo = Object.assign({}, this.signInCustomer);

    this.customerNewInfoForm.setValue({
      firstName: this.customerNewInfo.firstName,
      lastName: this.customerNewInfo.lastName,
      email: this.customerNewInfo.email,
      phoneNumber: this.customerNewInfo.phoneNumber,
      licenceNo: this.customerNewInfo.licenceNo,
      address: this.customerNewInfo.address,
      gender: this.customerNewInfo.gender,
      profilePicture: null
    });

    this.showeditmodel.nativeElement.click();
    setTimeout(() => {
      // console.log('bbhjbhj');
      this.firstname.nativeElement.focus();
    }, 600);
  }

  removePicture() {

  }

  updateCustomerNewInfo(formValue: any, formDirective: FormGroupDirective) {
    this.isLoading = true;
    this.customerNewInfo.firstName = formValue.firstName;
    this.customerNewInfo.lastName = formValue.lastName;
    this.customerNewInfo.password = formValue.password;
    this.customerNewInfo.phoneNumber = formValue.phoneNumber;
    this.customerNewInfo.licenceNo = formValue.licenceNo;
    this.customerNewInfo.address = formValue.address;
    this.customerNewInfo.gender = formValue.gender;

    const formData = new FormData();
    formData.append("Files", this.file);

    formData.append("Info", JSON.stringify(this.customerNewInfo));

    this.customerService.edit(this.customerNewInfo.id, formData).subscribe(
      (response: any) => {
        console.log(response)
        localStorage.setItem('signincustomerinfo', JSON.stringify(response));
        if (this.file != '') {
          let _data = JSON.stringify(response);
          this.router.navigate(["public/profile"], { queryParams: { _data } });
        } else {
          this.signInCustomer = response;
        }

        this.hideeditmodel.nativeElement.click();
        this.toastr.success('', 'Customer Updated Successfully');
        this.resetForm(formDirective);
      },
      error => {
        this.isLoading = false;
        this.toastr.error('', 'Customer Updating Error');
        console.log("Error: ", error);
      }
    );
  }


  resetForm(formDirective: FormGroupDirective) {
    this.isLoading = false;
    formDirective.resetForm();
    this.customerNewInfo = new Customer();
  }

  changePassword(formValue: any, formDirective: FormGroupDirective) {
    this.customerNewInfo = Object.assign({}, this.signInCustomer);
    console.log(formValue)
    if (formValue.newpassword != formValue.confirmPassword) {
      this.toastr.error('New and Confirmation Password does not match.', 'Password are not Matching');
      return;
    }

    this.isLoading = true;
    this.changePasswordObj.oldPassword = formValue.oldpassword;
    this.changePasswordObj.newPassword = formValue.newpassword;

    this.customerService.changePassword(this.customerNewInfo.id, this.changePasswordObj).subscribe(
      (response: any) => {
        console.log(response)
        localStorage.setItem('signincustomerinfo', JSON.stringify(response));
        this.signInCustomer = response;
        this.hidepasswordmodel.nativeElement.click();
        this.toastr.success('', 'Password Changed Successfully');
        this.resetForm(formDirective);
      },
      error => {
        this.isLoading = false;
        if (error.error == "mismatch") {
          this.toastr.error('Old and New Password does not match.', 'Password are not Matching');
        }
        else {
          this.toastr.error('', 'Password Changing Error');
        }
        console.log("Error: ", error);
      }
    );
  }
}
