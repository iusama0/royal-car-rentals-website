import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Driver } from 'src/app/Models/driver.model';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-admin-driver-detail',
  templateUrl: './admin-driver-detail.component.html',
  styleUrls: ['./admin-driver-detail.component.css']
})
export class AdminDriverDetailComponent implements OnInit {
  @ViewChild('hideeditmodel') hideeditmodel: any;

  driver: Driver;
  editDriverObj: Driver;
  file: string = '';

  constructor(
    public driverService: DriverService,
    private toastr: ToastrService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.driver = JSON.parse(this.activatedRoute.snapshot.queryParams._data);
    this.editDriverObj = Object.assign({}, this.driver);
  }

  ngOnInit(): void {

  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  edit(form: NgForm) {

    const formData = new FormData();
    formData.append("Files", this.file);

    formData.append("Info", JSON.stringify(this.editDriverObj));

    this.driverService.edit(this.editDriverObj.id, formData).subscribe(
      (response: any) => {
        console.log(response)
        if (this.file != '') {
          alert("if");
          let _data = JSON.stringify(response);
          this.router.navigate(["admin/driver-detail"], { queryParams: { _data } });
        } else {
          alert("else");
          this.driver = this.editDriverObj = response;
        }

        this.hideeditmodel.nativeElement.click();
        this.toastr.success('', 'Driver Updated Successfully');
      },
      error => {
        form.form.reset();
        this.toastr.error('', 'Driver Updating Error');
        console.log("Error: " + error);
      }
    );
  }

  removePicture() {

  }

}
