import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Driver } from 'src/app/Models/driver.model';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-driver-common-section',
  templateUrl: './driver-common-section.component.html',
  styleUrls: ['./driver-common-section.component.css']
})
export class DriverCommonSectionComponent implements OnInit {
  public isSidebarToggle: boolean = false;
  public isAuthenticated: boolean = false;
  public currentDriver: Driver;
  public currentPage: string = '/driver/dashboard';

  constructor(
    public driverService: DriverService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentDriver = JSON.parse(localStorage.getItem('signindriverinfo') || 'null');

    if (this.currentDriver) {
      this.driverService.isDriverAuthenticated.emit(true);
      this.isAuthenticated = true;
    } else {
      this.signOut();
    }

    this.driverService.isDriverAuthenticated.subscribe(response => {
      this.isAuthenticated = response;
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
    localStorage.removeItem("signindriverinfo");
    this.driverService.isDriverAuthenticated.emit(false);
    this.router.navigateByUrl("driver/signin");
  }
}
