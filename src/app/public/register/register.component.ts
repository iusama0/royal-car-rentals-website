import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  toggleForm() {
    if (this.showSignInForm) {
      this.showSignInForm = false;
    } else {
      this.showSignInForm = true;
    }
  }

  signIn(form: NgForm) {
    this.customerService.signIn(this.cred).subscribe(
      response => {
        // console.log(response)
        localStorage.setItem('signincustomerinfo', JSON.stringify(response));
        this.resetSignInForm(form);
        this.customerService.isAuthenticatedCustomer.emit(true);
        this.toastr.success('', 'Sign In Successfully');
        this.router.navigateByUrl("public/bookings");
      },
      error => {
        form.form.reset();
        this.toastr.error('', 'Incorrect Email and Password!');
        console.log("Error: " + error);
      }
    );
  }

  signUp(form: NgForm) {
    // console.log(this.newregisterCustomer)
    this.customerService.signUp(this.newregisterCustomer).subscribe(
      response => {
        // console.log(response)
        localStorage.setItem('signincustomerinfo', JSON.stringify(response));
        this.resetSignUpForm(form);
        this.customerService.isAuthenticatedCustomer.emit(true);
        this.toastr.success('', 'Sign Up Successfully');
        this.router.navigateByUrl("public/bookings");
      },
      error => {
        form.form.reset();
        this.toastr.error('', 'Incorrect Email and Password!');
        console.log("Error: " + error);
      }
    );
  }
  resetSignInForm(form: NgForm) {
    form.form.reset();
    this.cred = new Signin();
  }

  resetSignUpForm(form: NgForm) {
    form.form.reset();
    this.newregisterCustomer = new Customer();
    this.newregisterCustomer.isActive = false;
    this.newregisterCustomer.gender = 'male';
    this.newregisterCustomer.verificationStatus = 'pending';
    this.newregisterCustomer.dateAdded = new Date().toISOString();
    this.newregisterCustomer.dateUpdated = new Date().toISOString();
  }
}
