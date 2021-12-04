import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public counts: any;

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.dashboardCounts();
  }

  dashboardCounts() {
    this.commonService.dashboardCounts().subscribe(
      (response: any) => {
        this.counts = response;
        console.log(this.counts)
      },
      (error: any) => {
        console.log("Error: " , error);
      }
    )
  }

}
