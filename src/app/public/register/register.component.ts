import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangePassword } from 'src/app/Models/change-password.model';
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

  customerInfo: Customer;
  @ViewChild('stepper') stepper: MatStepper;
  showForgotPasswordForm: boolean = false;

  public firstForgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z][-_.a-zA-Z0-9]{2,29}@(yahoo|hotmail|gmail).com$")]),
  });

  public secondForgotPasswordForm = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.pattern("^([0-9]{4})$")]),
  });

  public thirdForgotPasswordForm = new FormGroup({
    newpassword: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9-.@_ ]{2,30}$")]),
    confirmPassword: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9-.@_ ]{2,30}$")])
  });

  changePasswordObj: ChangePassword = {
    oldPassword: '',
    newPassword: '',
    isResetPassword: true
  };

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
    address: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9-.,# ]{2,30}$")]),
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
    address: '',
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
      this.router.navigateByUrl("public/profile");

    }
  }

  public hasError = (formName: string, controlName: string, errorName: string) => {

    if (formName == 'signin') {
      return this.signInForm.controls[controlName].hasError(errorName);
    } else if (formName == 'signup') {
      return this.signUpForm.controls[controlName].hasError(errorName);
    } else if (formName == 'first') {
      return this.firstForgotPasswordForm.controls[controlName].hasError(errorName);
    } else if (formName == 'second') {
      return this.secondForgotPasswordForm.controls[controlName].hasError(errorName);
    } else if (formName == 'third') {
      return this.thirdForgotPasswordForm.controls[controlName].hasError(errorName);
    }

    return null;
  }

  toggleForm() {
    if (this.showForgotPasswordForm) {
      this.showForgotPasswordForm = false;
    }

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
        this.router.navigateByUrl("public/profile");
      },
      error => {
        this.isLoading = false;
        if (error.error == "incorrect_email") {
          this.toastr.error('You entered incorrect email!', 'Incorrect Email');
        } else if (error.error == "incorrect_password") {
          this.toastr.error('You entered incorrect password!', 'Incorrect Password');
        }

        console.log("Error: ", error);
      }
    );
  }

  signUp(formValue: any, formDirective: FormGroupDirective) {

    if (formValue.password != formValue.confirmPassword) {
      this.toastr.error('', 'Confirmation password did not match!');
      return;
    }

    this.isLoading = true;
    this.newregisterCustomer.firstName = formValue.firstName;
    this.newregisterCustomer.lastName = formValue.lastName;
    this.newregisterCustomer.email = formValue.email;
    this.newregisterCustomer.password = formValue.password;
    this.newregisterCustomer.phoneNumber = formValue.phoneNumber;
    this.newregisterCustomer.isActive = false;
    this.newregisterCustomer.licenceNo = formValue.licenceNo;
    this.newregisterCustomer.address = formValue.address;
    this.newregisterCustomer.verificationStatus = "pending";
    this.newregisterCustomer.profilePicture = "";
    this.newregisterCustomer.gender = formValue.gender;

    this.customerService.signUp(this.newregisterCustomer).subscribe(
      response => {
        localStorage.setItem('signincustomerinfo', JSON.stringify(response));
        this.resetSignUpForm(formDirective);
        this.customerService.isAuthenticatedCustomer.emit(true);
        this.toastr.success('', 'Sign Up Successfully');
        this.router.navigateByUrl("public/profile");
      },
      (error: any) => {
        this.isLoading = false;
        if (error.error == "email_already_registered") {
          this.toastr.error('This email address is already registered!', 'Already Registered');
        } else if (error.error == "phone_already_registered") {
          this.toastr.error('This phone number is already registered!', 'Already Registered');
        } else if (error.error == "licenceno_already_registered") {
          this.toastr.error('This licence number is already registered!', 'Already Registered');
        } else {
          this.toastr.error('We\'re sorry, but something went wrong. Please try again!', 'Registeration Failed');
        }

        console.log("Error: ", error);
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

  forgotPassword() {
    this.showForgotPasswordForm = true;
    this.showSignInForm = false;
  }

  sendForgotPasswordCode(formValue: any) {
    console.log(formValue.email)
    this.isLoading = true;

    this.customerService.sendForgotPasswordCode(formValue.email).subscribe(
      (response: any) => {
        console.log(response)
        this.customerInfo = response;
        //loading button enable
        this.isLoading = false;

        // move to next step
        this.stepper.next();
      },
      (error: any) => {
        this.isLoading = false;
        this.toastr.error('', 'Incorrect email address!');
        console.log("Error: ", error);
      }
    );
  }

  verifyForgotPasswordCode(formValue: any) {
    this.isLoading = true;

    this.customerService.VerifyForgotPasswordCode(formValue.code, this.firstForgotPasswordForm.value.email).subscribe(
      (response: any) => {
        this.customerInfo = response;

        //loading button enable
        this.isLoading = false;

        // move to next step
        this.stepper.next();
      },
      error => {
        this.isLoading = false;
        this.toastr.error('', 'Verification code incorrect!');
        console.log("Error: ", error);
      }
    );
  }

  changePassword(formValue: any) {
    console.log(formValue)
    if (formValue.newpassword != formValue.confirmPassword) {
      this.toastr.error('New and Confirmation Password does not match.', 'Password are not Matching');
      return;
    }

    this.isLoading = true;

    this.changePasswordObj.newPassword = formValue.newpassword;

    this.customerService.changePassword(this.customerInfo.id, this.changePasswordObj).subscribe(
      (response: any) => {
        console.log(response)

        this.isLoading = false;
        this.showForgotPasswordForm = false;
        this.showSignInForm = true;

        this.toastr.success('', 'Password Reset Successfully');
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
