import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/Models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-admin-customer-detail',
  templateUrl: './admin-customer-detail.component.html',
  styleUrls: ['./admin-customer-detail.component.css']
})
export class AdminCustomerDetailComponent implements OnInit {
  @ViewChild('hideeditmodel') hideeditmodel: any;

  customer: Customer;
  editCustomerObj: Customer;
  file: string = '';

  constructor(
    public customerService: CustomerService,
    public activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.customer = JSON.parse(this.activatedRoute.snapshot.queryParams._data);
    this.editCustomerObj = Object.assign({}, this.customer);
  }

  ngOnInit(): void {

  }

  changeStatus(form: NgForm) {

    const formData = new FormData();
    formData.append("Files", this.file);

    formData.append("Info", JSON.stringify(this.editCustomerObj));

    this.customerService.edit(this.editCustomerObj.id, formData).subscribe(
      (response: any) => {
        console.log(response)

        this.customer = this.editCustomerObj;

        this.hideeditmodel.nativeElement.click();
        this.toastr.success('', 'Status Updated Successfully');
      },
      error => {
        form.form.reset();
        this.toastr.error('', 'Status Updating Error');
        console.log("Error: " + error);
      }
    );
  }

}
