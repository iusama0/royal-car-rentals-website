import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/Models/customer.model';
import { Signin } from 'src/app/Models/signin.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public isLoading: boolean = false;
  public hide = true;
  public hideConfirm = true;
  public signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z][-_.a-zA-Z0-9]{2,29}@(yahoo|hotmail|gmail).com$")]),
    password: new FormControl('', [Validators.required]),
    // isRemember: new FormControl(false),
  });



  public signUpForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern("^([a-zA-Z.]+((['.][a-zA-Z])?[a-zA-Z]*)*){2,30}$")]),
    lastName: new FormControl('', [Validators.required, Validators.pattern("^([a-zA-Z]+((['.][a-zA-Z])?[a-zA-Z]*)*){2,30}$")]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z][-_.a-zA-Z0-9]{2,29}@(yahoo|hotmail|gmail).com$")]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^((\\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$")]),
    licenceNo: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9-. ]{2,30}$")]),
    gender: new FormControl('male'),
    password: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9- ]{2,30}$")]),
    confirmPassword: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9- ]{2,30}$")])
  });

  newregisterCustomer: Customer = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    licenceNo: '',
    profilePicture: '',
    verificationStatus: 'pending',
    gender: 'male',
    isActive: true,
    dateAdded: new Date().toISOString(),
    dateUpdated: new Date().toISOString()
  };

  registerCustomer: Customer;

  cred: Signin = {
    email: "",
    password: "",
    isRemember: false
  };
  showSignInForm: boolean = true;
  constructor(
    public customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerCustomer = JSON.parse(localStorage.getItem('signincustomerinfo') || 'null');
    if (this.registerCustomer) {
      this.customerService.isAuthenticatedCustomer.emit(true);
      this.router.navigateByUrl("public/bookings");

    }
  }

  public hasError = (formName: string, controlName: string, errorName: string) => {

    if (formName == 'signin') {
      return this.signInForm.controls[controlName].hasError(errorName);
    } else if (formName == 'signup') {
      return this.signUpForm.controls[controlName].hasError(errorName);
    }

    return null;
  }

  toggleForm() {
    if (this.showSignInForm) {
      this.showSignInForm = false;
    } else {
      this.showSignInForm = true;
    }
  }

  signIn(formValue: any, formDirective: FormGroupDirective) {
    this.isLoading = true;
    this.cred.email = formValue.email;
    this.cred.password = formValue.password;
    this.cred.isRemember = formValue.isRemember;
    this.customerService.signIn(this.cred).subscribe(
      response => {
        console.log(response)
        localStorage.setItem('signincustomerinfo', JSON.stringify(response));
        this.resetSignInForm(formDirective);
        this.customerService.isAuthenticatedCustomer.emit(true);
        this.toastr.success('', 'Sign In Successfully');
        this.router.navigateByUrl("public/bookings");
      },
      error => {
        this.isLoading = false;
        this.toastr.error('', 'Incorrect Email and Password!');
        console.log("Error: " + error);
      }
    );
  }

  signUp(formValue: any, formDirective: FormGroupDirective) {

    if (formValue.password != formValue.confirmPassword) {
      this.toastr.error('', 'Password did not match!');
      return;
    }
    this.isLoading = true;
    this.newregisterCustomer.firstName = formValue.firstName;
    this.newregisterCustomer.lastName = formValue.lastName;
    this.newregisterCustomer.email = formValue.email;
    this.newregisterCustomer.password = formValue.password;
    this.newregisterCustomer.phoneNumber = formValue.phoneNumber;
    this.newregisterCustomer.isActive = true;
    this.newregisterCustomer.licenceNo = formValue.licenceNo;
    this.newregisterCustomer.verificationStatus = "pending";
    this.newregisterCustomer.profilePicture = "";
    this.newregisterCustomer.gender = formValue.gender;

    this.customerService.signUp(this.newregisterCustomer).subscribe(
      response => {
        localStorage.setItem('signincustomerinfo', JSON.stringify(response));
        this.resetSignUpForm(formDirective);
        this.customerService.isAuthenticatedCustomer.emit(true);
        this.toastr.success('', 'Sign Up Successfully');
        this.router.navigateByUrl("public/bookings");
      },
      error => {
        this.isLoading = false;
        this.toastr.error('', 'Incorrect Email and Password!');
        console.log("Error: " + error);
      }
    );
  }
  resetSignInForm(formDirective: FormGroupDirective) {
    this.isLoading = false;
    formDirective.resetForm();
    this.cred = new Signin();
  }

  resetSignUpForm(formDirective: FormGroupDirective) {
    this.isLoading = false;
    formDirective.resetForm();
    this.newregisterCustomer = new Customer();
    this.newregisterCustomer.isActive = true;
    this.newregisterCustomer.gender = 'male';
    this.newregisterCustomer.verificationStatus = 'pending';
    this.newregisterCustomer.dateAdded = new Date().toISOString();
    this.newregisterCustomer.dateUpdated = new Date().toISOString();
  }
}
