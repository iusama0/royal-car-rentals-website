import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Vehicle } from 'src/app/Models/vehicle.model';
import { NgForm } from '@angular/forms';
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

  getCounts() {
    this.vehicleService.counts().subscribe(
      (response: any) => {
        this.counts = response;
        console.log(this.counts)
      },
      (error: any) => {
        console.log("Error: " + error);
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
        console.log("Error: " + error);
      }
    );
  }

  getVehicleMakers() {
    this.vehicleMakerService.gets().subscribe(
      (response: any) => {
        this.vehicleMakers = response;
        this.newVehicle.makerId = this.vehicleMakers[0].id;
        //this.changeVehicleMacker(this.newVehicle.makerId);
      },
      (error: any) => {
        console.log("Error: " + error);
      }
    );
  }

  getVehicleModels() {
    this.vehicleModelService.gets().subscribe(
      (response: any) => {
        this.vehicleModels = response;
        this.newVehicle.modelId = this.vehicleModels[0].id;
        this.changeVehicleMacker(this.newVehicle.makerId);
      },
      (error: any) => {
        console.log("Error: " + error);
      }
    );
  }

  getCities() {
    this.cityService.gets().subscribe(
      (response: any) => {
        this.cities = response;
        this.newVehicle.cityId = this.cities[0].id;
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

  addVehicle(form: NgForm) {
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
        this.resetForm(form);
        this.closebutton.nativeElement.click();
        this.toastr.success('', 'Vehicle Added Successfully');
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
    this.newVehicle.makerId = this.vehicleMakers[0].id;
    this.changeVehicleMacker(this.newVehicle.makerId);
    // this.newVehicle.modelId = this.vehicleModels[0].id;
    this.newVehicle.availability = false;
    this.newVehicle.status = 'pending';
    this.newVehicle.dateAdded = new Date().toISOString();
    this.newVehicle.dateUpdated = new Date().toISOString();
    this.files = [];
  }

  viewVehicle(data: any) {
    let _data = JSON.stringify(data);
    this.router.navigate(["admin/vehicle-detail"], { queryParams: { _data } });
  }

  editVehicle(data: any) {
    // console.log("editVehicle")
    // console.log(data)
  }

  deleteVehicle(data: any) {
    // console.log(data)
    this.deleteVehicleInfo = data;
    this.showdeletemodel.nativeElement.click();

  }

  confirmDeleteVehicle() {
    // console.log("confirmDeleteVehicle: " + this.deleteVehicleInfo)
    this.vehicleService.deleteVehicle(this.deleteVehicleInfo).subscribe(
      (response: any) => {

        // this.vehicles.(); remove vehicle
        for (var i = 0; i < this.vehicles.data.length; i++) {
          if (this.vehicles.data[i].id == this.deleteVehicleInfo.id) {
            this.vehicles.data.splice(i, 1);
          }
        }
        this.vehicles.paginator = this.vehiclePaginator;
        this.vehicles.sort = this.vehicleSort;
        this.vehicleTable.renderRows();

        this.hidedeletemodel.nativeElement.click();
        this.toastr.success('', 'Vehicle Deleted Successfully');
      },
      error => {
        this.toastr.error('', 'Error Vehicle Deleting');
        console.log("Error: " + error);
      }
    );
  }

  changeVehicleMacker(data: number) {
    this.vehicleModelsFilter = this.vehicleModels.filter(x => x.makerId == data);
  }

}
