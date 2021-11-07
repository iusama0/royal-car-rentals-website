import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Inquiry } from 'src/app/Models/inquiry.model';
import { InquiryService } from 'src/app/services/inquiry.service';

import { FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})

/** Error when invalid control is dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

export class ContactUsComponent implements OnInit {
  inquiryObj: Inquiry = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    dateAdded: new Date().toISOString(),
    dateUpdated: new Date().toISOString()
  };

  public contactUsForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    message: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
  });


  constructor(
    public inquiryService: InquiryService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.contactUsForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      message: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
    });

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.contactUsForm.controls[controlName].hasError(errorName);
  }

  addVehicle(formValue: any, formDirective: FormGroupDirective) {
    console.log(formValue)
    this.inquiryObj.firstName = formValue.firstName;
    this.inquiryObj.lastName = formValue.lastName;
    this.inquiryObj.email = formValue.email;
    this.inquiryObj.message = formValue.message;

    this.inquiryService.add(this.inquiryObj).subscribe(
      (response: any) => {
        formDirective.resetForm();
        this.inquiryObj = new Inquiry();
        this.toastr.success('', 'Message Send Successfully');
      },
      error => {
        this.toastr.error('', 'Message Sending Error');
        console.log("Error: " + error);
      }
    );
  }
}
