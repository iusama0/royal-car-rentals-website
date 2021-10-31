import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Inquiry } from 'src/app/Models/inquiry.model';
import { InquiryService } from 'src/app/services/inquiry.service';

@Component({
  selector: 'app-admin-inquiry',
  templateUrl: './admin-inquiry.component.html',
  styleUrls: ['./admin-inquiry.component.css']
})
export class AdminInquiryComponent implements OnInit {
  dtOptions: DataTables.Settings = {
    //default number of records per page
    pageLength: 10,
    //It can be simple or full_numbers
    pagingType: 'full_numbers',
    autoWidth: false,
    responsive: true,
    //select from drop down list to select number of records per page 
    lengthMenu: [10, 20, 30, 40],
    processing: true,
    columns: [
      { data: 'id', orderable: true },
      { data: 'firstName', orderable: true },
      { data: 'email', orderable: false },
      { data: 'message', orderable: false },     
      { data: 'dateAdded', orderable: true },
      // { data: 'action', orderable: false },
    ]
  };

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  public inquiries: Inquiry[];

  constructor(
    public inquiryService: InquiryService
  ) { }

  ngOnInit(): void {
    this.getInquiries();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  getInquiries() {
    this.inquiryService.gets().subscribe(
      (response: any) => {
        this.inquiries = response
        this.rerender();
        console.log("Success: " + response);
      },
      (error: any) => {
        console.log("Error: " + error);
      }
    );
  }

}
