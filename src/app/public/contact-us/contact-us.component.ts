import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Inquiry } from 'src/app/Models/inquiry.model';
import { InquiryService } from 'src/app/services/inquiry.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
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

  constructor(
    public inquiryService: InquiryService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  addVehicle(form: NgForm, event: any) {
    console.log(this.inquiryObj)

    this.inquiryService.add(this.inquiryObj).subscribe(
      (response: any) => {
        this.resetForm(form);
        this.toastr.success('', 'Message Send Successfully');
      },
      error => {
        form.form.reset();
        this.toastr.error('', 'Message Sending Error');
        console.log("Error: " + error);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.inquiryObj = new Inquiry();
  }


}
