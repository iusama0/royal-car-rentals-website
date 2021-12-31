import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Driver } from 'src/app/Models/driver.model';
import { Signin } from 'src/app/Models/signin.model';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-driver-signin',
  templateUrl: './driver-signin.component.html',
  styleUrls: ['./driver-signin.component.css']
})
export class DriverSigninComponent implements OnInit {
  currentDriver: Driver;
  cred: Signin = {
    email: "",
    password: "",
    isRemember: false
  };

  constructor(
    public driverServices: DriverService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentDriver = JSON.parse(localStorage.getItem('signindriverinfo') || 'null');

    if (this.currentDriver) {
      this.driverServices.isDriverAuthenticated.emit(true);
      this.router.navigateByUrl("driver/dashboard");
    }
  }

  signIn(form: NgForm) {
    this.driverServices.authentication(this.cred).subscribe(
      response => {
        localStorage.setItem('signindriverinfo', JSON.stringify(response));
        this.resetForm(form);
        this.driverServices.isDriverAuthenticated.emit(true);
        this.toastr.success('', 'Driver Login Successfully');
        this.router.navigateByUrl("driver/dashboard");
      },
      error => {
        form.form.reset();
        this.toastr.error('', 'Incorrect Email and Password!');
        console.log("Error: ", error);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.cred = new Signin();
  }

}
