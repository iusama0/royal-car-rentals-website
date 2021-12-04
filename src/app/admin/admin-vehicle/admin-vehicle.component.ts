import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Vehicle } from 'src/app/Models/vehicle.model';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Subject } from 'rxjs';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VehicleMakerService } from 'src/app/services/vehicle-maker.service';
import { VehicleModelService } from 'src/app/services/vehicle-model.service';
import { VehicleModel } from 'src/app/Models/vehicle-model.model';
import { VehicleMaker } from 'src/app/Models/vehicle-maker.model';
import { City } from 'src/app/Models/city.model';
import { CityService } from 'src/app/services/city.service';
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

  public isLoading: boolean = false;

  public addVehicleForm = new FormGroup({
    makerId: new FormControl('', [Validators.required]),
    modelId: new FormControl('', [Validators.required]),
    cityId: new FormControl('', [Validators.required]),
    modelYear: new FormControl('', [Validators.required, Validators.pattern("^([0-9]{4})$")]),
    registrationNumber: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9-. ]{2,30}$")]),
    color: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9-. ]{2,30}$")]),
    //color: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.pattern("^([0-9]{4,5})$")]),
    availability: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    imagesPath: new FormControl('')
  });

  newVehicle: Vehicle = {
    id: 0,
    makerId: 0,
    modelId: 0,
    cityId: 0,
    modelYear: 0,
    registrationNumber: '',
    color: '',
    status: 'pending',
    availability: false,
    price: 0,
    imagesPath: '',
    dateAdded: new Date().toISOString(),
    dateUpdated: new Date().toISOString(),
    images: [],
    maker: new VehicleMaker,
    model: new VehicleModel,
    city: new City
  };
  files: string[] = [];
  fileMessage = '';

  public deleteVehicleInfo: Vehicle;
  VehicleColumns: string[] = ['id', 'makerId', 'modelId', 'registrationNumber', 'status', 'availability', 'price', 'dateAdded', 'dateUpdated', 'actions'];
  vehicles: MatTableDataSource<Vehicle>;
  @ViewChild('VehicleTable', { static: true }) vehicleTable: MatTable<Vehicle>;
  @ViewChild('VehiclePaginator', { static: true }) vehiclePaginator: MatPaginator;
  @ViewChild('VehicleSort', { static: true }) vehicleSort: MatSort;

  public vehicleMakers: VehicleMaker[];
  public vehicleModels: VehicleModel[];
  public vehicleModelsFilter: VehicleModel[];
  public cities: City[];
  public counts: any;

  constructor(
    public vehicleModelService: VehicleModelService,
    public vehicleMakerService: VehicleMakerService,
    public vehicleService: VehicleService,
    public cityService: CityService,
    private toastr: ToastrService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getCounts();
    this.getVehicles();
    this.getVehicleMakers();
    this.getVehicleModels();
    this.getCities();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addVehicleForm.controls[controlName].hasError(errorName);
  }

  getCounts() {
    this.vehicleService.counts().subscribe(
      (response: any) => {
        this.counts = response;
      },
      (error: any) => {
        console.log("Error: " , error);
      }
    )
  }

  getVehicles() {
    this.vehicleService.getVehicles().subscribe(
      (response: any) => {
        this.vehicles = new MatTableDataSource(response);
        this.vehicles.paginator = this.vehiclePaginator;
        this.vehicles.sort = this.vehicleSort;
        // this.vehicleMakerTable.renderRows();
      },
      (error: any) => {
        console.log("Error: " , error);
      }
    );
  }

  getVehicleMakers() {
    this.vehicleMakerService.gets().subscribe(
      (response: any) => {
        this.vehicleMakers = response;
      },
      (error: any) => {
        console.log("Error: " , error);
      }
    );
  }

  getVehicleModels() {
    this.vehicleModelService.gets().subscribe(
      (response: any) => {
        this.vehicleModels = response;
      },
      (error: any) => {
        console.log("Error: " , error);
      }
    );
  }

  getCities() {
    this.cityService.gets().subscribe(
      (response: any) => {
        this.cities = response;
      },
      (error: any) => {
        console.log("Error: " , error);
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
    }
  }

  addVehicle(formValue: any, formDirective: FormGroupDirective) {
    this.isLoading = true;
    this.newVehicle.makerId = formValue.makerId;
    this.newVehicle.modelId = formValue.modelId;
    this.newVehicle.cityId = formValue.cityId;
    this.newVehicle.modelYear = formValue.modelYear;
    this.newVehicle.registrationNumber = formValue.registrationNumber;
    this.newVehicle.color = formValue.color;
    this.newVehicle.price = formValue.price;
    this.newVehicle.availability = formValue.availability;
    this.newVehicle.status = formValue.status;

    const formData = new FormData();

    for (var i = 0; i < 3; i++) {
      formData.append("Files", this.files[i]);
    }

    formData.append("Info", JSON.stringify(this.newVehicle));

    this.vehicleService.addVehicle(formData).subscribe(
      (response: any) => {
        this.vehicles.data.push(response)
        this.vehicles.paginator = this.vehiclePaginator;
        this.vehicles.sort = this.vehicleSort;
        this.vehicleTable.renderRows();
        this.resetForm(formDirective);
        this.closebutton.nativeElement.click();
        this.toastr.success('', 'Vehicle Added Successfully');
      },
      error => {
        this.isLoading = false;
        this.toastr.error('', 'Vehicle Adding Error');
        console.log("Error: " , error);
      }
    );
  }

  resetForm(formDirective: FormGroupDirective) {
    this.isLoading = false;
    formDirective.resetForm();
    this.newVehicle = new Vehicle();
    this.files = [];
  }

  viewVehicle(data: any) {
    let _data = JSON.stringify(data);
    this.router.navigate(["admin/vehicle-detail"], { queryParams: { _data } });
  }

  deleteVehicle(data: any) {
    this.deleteVehicleInfo = data;
    this.showdeletemodel.nativeElement.click();

  }

  confirmDeleteVehicle() {
    this.isLoading = true;
    this.vehicleService.deleteVehicle(this.deleteVehicleInfo).subscribe(
      (response: any) => {
        for (var i = 0; i < this.vehicles.data.length; i++) {
          if (this.vehicles.data[i].id == this.deleteVehicleInfo.id) {
            this.vehicles.data.splice(i, 1);
          }
        }
        this.vehicles.paginator = this.vehiclePaginator;
        this.vehicles.sort = this.vehicleSort;
        this.vehicleTable.renderRows();
        this.isLoading = false;
        this.hidedeletemodel.nativeElement.click();
        this.toastr.success('', 'Vehicle Deleted Successfully');
      },
      error => {
        this.isLoading = false;
        this.toastr.error('', 'Error Vehicle Deleting');
        console.log("Error: " , error);
      }
    );
  }

  changeVehicleMacker(data: number) {
    this.vehicleModelsFilter = this.vehicleModels.filter(x => x.makerId == data);
  }

}
