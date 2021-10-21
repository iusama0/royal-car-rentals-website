import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Admin } from 'src/app/Models/admin.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-common-section',
  templateUrl: './admin-common-section.component.html',
  styleUrls: ['./admin-common-section.component.css']
})
export class AdminCommonSectionComponent implements OnInit {
  isSidebarToggle: boolean = false;
  isAuthenticated: boolean = false;
  currentUser: Admin;
  constructor(
    public adminServices: AdminService,
    private toastr: ToastrService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('signinuserinfo') || 'null');
    console.log(this.currentUser)
    if (this.currentUser) {
      this.adminServices.isAuthenticated.emit(true);
      this.isAuthenticated = true;
    } else {
      this.goToSignIn();
    }

    this.adminServices.isAuthenticated.subscribe(response => {
      this.isAuthenticated = response;
    });


  }

  toggleSidebar() {
    if (this.isSidebarToggle == true) {
      this.isSidebarToggle = false;
    }
    else {
      this.isSidebarToggle = true;
    }
  }

  signOut() {
    localStorage.removeItem("signinuserinfo");
    this.adminServices.isAuthenticated.emit(false);
    this.toastr.success('', 'Sign Out Successfully');
    this.router.navigateByUrl("admin/signin");
  }

  goToSignIn() {
    localStorage.removeItem("signinuserinfo");
    this.adminServices.isAuthenticated.emit(false);
    this.router.navigateByUrl("admin/signin");
  }

}
