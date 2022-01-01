import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Admin } from 'src/app/Models/admin.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-common-section',
  templateUrl: './admin-common-section.component.html',
  styleUrls: ['./admin-common-section.component.css']
})
export class AdminCommonSectionComponent implements OnInit {
  public isSidebarToggle: boolean = false;
  public isAdminAuthenticated: boolean = false;
  public currentUser: Admin;
  public currentPage: string = '';

  constructor(
    public adminServices: AdminService,
    private toastr: ToastrService,
    private router: Router) {
      this.currentPage = this.router.url;
     }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('signinuserinfo') || 'null');

    if (this.currentUser) {
      this.adminServices.isAdminAuthenticated.emit(true);
      this.isAdminAuthenticated = true;
    } else {
      this.signOut();
    }

    this.adminServices.isAdminAuthenticated.subscribe(response => {
      this.isAdminAuthenticated = response;
    });

    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.currentPage = e.url;
        console.log(this.currentPage)
      }
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
    this.adminServices.isAdminAuthenticated.emit(false);
    this.router.navigateByUrl("admin/signin");
  }
}
