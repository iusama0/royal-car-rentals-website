import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { Inquiry } from 'src/app/Models/inquiry.model';
import { InquiryService } from 'src/app/services/inquiry.service';

@Component({
  selector: 'app-admin-inquiry',
  templateUrl: './admin-inquiry.component.html',
  styleUrls: ['./admin-inquiry.component.css']
})
export class AdminInquiryComponent implements OnInit {
  InquiriesColumns: string[] = ['id', 'firstName', 'email', 'message', 'dateAdded', 'dateUpdated', 'actions'];
  inquiries: MatTableDataSource<Inquiry>;
  @ViewChild('InquiriesTable', { static: true }) inquiriesTable: MatTable<Inquiry>;
  @ViewChild('InquiriesPaginator', { static: true }) inquiriesPaginator: MatPaginator;
  @ViewChild('InquiriesSort', { static: true }) inquiriesSort: MatSort;


  constructor(
    public inquiryService: InquiryService
  ) { }

  ngOnInit(): void {
    this.getInquiries();
  }

  ngAfterViewInit(): void {
    
  }

  getInquiries() {
    this.inquiryService.gets().subscribe(
      (response: any) => {
        this.inquiries = new MatTableDataSource(response);
        this.inquiries.paginator = this.inquiriesPaginator;
        this.inquiries.sort = this.inquiriesSort;
        // this.vehicleMakerTable.renderRows();
      },
      (error: any) => {
        console.log("Error: " + error);
      }
    );
  }

}
