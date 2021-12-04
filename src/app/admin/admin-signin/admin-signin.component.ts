import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Admin } from 'src/app/Models/admin.model';
import { Signin } from 'src/app/Models/signin.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-signin',
  templateUrl: './admin-signin.component.html',
  styleUrls: ['./admin-signin.component.css']
})
export class AdminSigninComponent implements OnInit {
  currentUser: Admin;
  cred: Signin = {
    email: "",
    password: "",
    isRemember: false
  };
  constructor(
    public adminServices: AdminService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('signinuserinfo') || 'null');
    if (this.currentUser) {
      this.adminServices.isAuthenticated.emit(true);
      this.router.navigateByUrl("admin/dashboard");

    }


  }

  signIn(form: NgForm) {
    this.adminServices.authentication(this.cred).subscribe(
      response => {
        localStorage.setItem('signinuserinfo', JSON.stringify(response));
        this.resetForm(form);
        this.adminServices.isAuthenticated.emit(true);
        this.toastr.success('', 'Administration Login Successfully');
        this.router.navigateByUrl("admin/dashboard");
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
