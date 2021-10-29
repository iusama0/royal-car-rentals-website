import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Vehicle } from 'src/app/Models/vehicle.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
declare var $: any

@Component({
  selector: 'app-admin-vehicle',
  templateUrl: './admin-vehicle.component.html',
  styleUrls: ['./admin-vehicle.component.css']
})
export class AdminVehicleComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  @ViewChild('showdeletemodel') showdeletemodel: any;
  @ViewChild('hidedeletemodel') hidedeletemodel: any;
  // @ViewChild('imagesPath') uploadImagesInput: ElementRef;
  newVehicle: Vehicle = {
    id: 0,
    makerName: '',
    modelName: '',
    modelYear: 0,
    registrationNumber: '',
    color: '',
    status: 'pending',
    availability: false,
    price: 0,
    imagesPath: '',
    dateAdded: new Date().toISOString(),
    dateUpdated: new Date().toISOString()
  };
  files: string[] = [];
  fileMessage = '';
  title = 'datatables';
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
      { data: 'makerName', orderable: false },
      { data: 'registrationNumber', orderable: false },
      { data: 'status', orderable: false },
      { data: 'availability', orderable: false },
      { data: 'price', orderable: true },
      { data: 'dateAdded', orderable: true },
      { data: 'action', orderable: false },
    ]
  };

  //{ data: 'modelYear' }, { data: 'Email' }, { data: 'IsActive' }, { defaultContent: '', orderable: false }
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  public vehicles: Vehicle[];
  public deleteVehicleInfo: Vehicle;

  constructor(
    public vehicleService: VehicleService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getVehicles();
    let _this = this;
    $(document).on('click', '.viewVehicleC', function (this: any) {
      var _id = $(this).parents("tr").find(".vid").text();
      let data = _this.vehicles.find(i => i.id == parseInt(_id));
      _this.viewVehicle(data);
    });

    $(document).on('click', '.editVehicleC', function (this: any) {
      var _id = $(this).parents("tr").find(".vid").text();
      let data = _this.vehicles.find(i => i.id == parseInt(_id));
      _this.editVehicle(data);
    });
    $(document).on('click', '.deleteVehicleC', function (this: any) {
      var _id = $(this).parents("tr").find(".vid").text();
      let data = _this.vehicles.find(i => i.id == parseInt(_id));
      _this.deleteVehicle(data);
    });
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

  getVehicles() {
    this.vehicleService.getVehicles().subscribe(
      (response: any) => {
        this.vehicles = response
        this.rerender();
        console.log("Success: " + response);
      },
      (error: any) => {
        console.log("Error: " + error);
      }
    );
  }

  onFileChange(event: any) {
    this.files = [];
    var fileCount = event.target.files.length;

    if (fileCount <= 3) {
      this.fileMessage = '';
      for (var i = 0; i < event.target.files.length; i++) {
        this.files.push(event.target.files[i]);
      }
    } else {
      this.fileMessage = "You can select only 3 files"
      // this.uploadImagesInput.nativeElement.value = '';
    }
  }

  addVehicle(form: NgForm, event: any) {
    console.log(this.newVehicle)

    const formData = new FormData();

    for (var i = 0; i < 3; i++) {
      formData.append("Files", this.files[i]);
    }

    formData.append("Info", JSON.stringify(this.newVehicle));

    this.vehicleService.addVehicle(formData).subscribe(
      (response: any) => {
        this.vehicles.push(response)
        this.rerender();
        this.resetForm(form);
        this.closebutton.nativeElement.click();
        this.toastr.success('', 'Vehicle Added Successfully');
        alert('Uploaded Successfully.');
        event.preventDefault();
        event.stopPropagation();
      },
      error => {
        form.form.reset();
        this.toastr.error('', 'Vehicle Adding Error');
        console.log("Error: " + error);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    // this.uploadImagesInput.nativeElement.value = '';
    this.newVehicle = new Vehicle();
    this.newVehicle.availability = false;
    this.newVehicle.status = 'pending';
    this.newVehicle.dateAdded = new Date().toISOString();
    this.newVehicle.dateUpdated = new Date().toISOString();
    this.files = [];
  }

  viewVehicle(data: any) {


    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     "user": JSON.stringify(data)
    //   }
    // };
    let _data = JSON.stringify(data);

    this.router.navigate(["admin/vehicle-detail"], { queryParams: { _data } });
    // this.router.navigate(["admin/vehicle-detail"]);

    // this.router.navigateByUrl("admin/vehicle-detail", { state: { data: data } });
  }

  editVehicle(data: any) {
    console.log("editVehicle")
    console.log(data)
  }

  deleteVehicle(data: any) {
    console.log(data)
    this.deleteVehicleInfo = data;
    this.showdeletemodel.nativeElement.click();

  }

  confirmDeleteVehicle() {
    console.log("confirmDeleteVehicle: " + this.deleteVehicleInfo)
    this.vehicleService.deleteVehicle(this.deleteVehicleInfo).subscribe(
      (response: any) => {

        // this.vehicles.(); remove vehicle
        // for (var i = 0; i < this.vehicles.length; i++) {
        //   let obj = this.vehicles[i];
        //   if (this.vehicles.indexOf(obj) !== -1) {
        //     this.vehicles.splice(i, 1);
        //   }
        // }

        this.rerender();
        this.hidedeletemodel.nativeElement.click();
        this.toastr.success('', 'Vehicle Deleted Successfully');
      },
      error => {
        this.toastr.error('', 'Error Vehicle Deleting');
        console.log("Error: " + error);
      }
    );
  }

}
