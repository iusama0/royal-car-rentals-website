import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { City } from 'src/app/Models/city.model';
import { VehicleMaker } from 'src/app/Models/vehicle-maker.model';
import { VehicleModel } from 'src/app/Models/vehicle-model.model';
import { CityService } from 'src/app/services/city.service';
import { CommonService } from 'src/app/services/common.service';
import { VehicleMakerService } from 'src/app/services/vehicle-maker.service';
import { VehicleModelService } from 'src/app/services/vehicle-model.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-admin-setting',
  templateUrl: './admin-setting.component.html',
  styleUrls: ['./admin-setting.component.css']
})
export class AdminSettingComponent implements OnInit {
  @ViewChild('closevehiclemakermodel') closevehiclemakermodel: any;
  @ViewChild('showvehiclemakermodel') showvehiclemakermodel: any;
  @ViewChild('hidedeletemakermodel') hidedeletemakermodel: any;
  @ViewChild('showvehiclemakereditmodel') showvehiclemakereditmodel: any;
  @ViewChild('hidevehiclemakereditmodel') hidevehiclemakereditmodel: any;

  VehicleMakerColumns: string[] = ['id', 'displayName', 'dateAdded', 'dateUpdated', 'actions'];
  vehicleMakers: MatTableDataSource<VehicleMaker>;
  @ViewChild('VehicleModelTable', { static: true }) vehicleMakerTable: MatTable<VehicleMaker>;
  @ViewChild('VehicleMakerPaginator', { static: true }) vehicleMakerPaginator: MatPaginator;
  @ViewChild('VehicleMakerSort', { static: true }) vehicleMakerSort: MatSort;

  deleteVehicleMakerObj: VehicleMaker;
  editVehicleMakerObj: VehicleMaker = {
    id: 0,
    displayName: '',
    dateAdded: new Date().toISOString(),
    dateUpdated: new Date().toISOString(),
  };
  newVehicleMaker: VehicleMaker = {
    id: 0,
    displayName: '',
    dateAdded: new Date().toISOString(),
    dateUpdated: new Date().toISOString(),
  }

  //model objects
  @ViewChild('closevehiclemodelmodel') closevehiclemodelmodel: any;
  @ViewChild('showvehiclemodelmodel') showvehiclemodelmodel: any;
  @ViewChild('hidedeletemodelmodel') hidedeletemodelmodel: any;
  @ViewChild('showvehiclemodeleditmodel') showvehiclemodeleditmodel: any;
  @ViewChild('hidevehiclemodeleditmodel') hidevehiclemodeleditmodel: any;

  VehicleModelColumns: string[] = ['id', 'makerId', 'displayName', 'dateAdded', 'dateUpdated', 'actions'];
  vehicleModels: MatTableDataSource<VehicleModel>;
  @ViewChild('VehicleModelTable', { static: true }) vehicleModelTable: MatTable<VehicleModel>;
  @ViewChild('VehicleModelPaginator', { static: true }) vehicleModelPaginator: MatPaginator;
  @ViewChild('VehicleModelSort', { static: true }) vehicleModelSort: MatSort;

  deleteVehicleModelObj: VehicleModel;
  editVehicleModelObj: VehicleModel = {
    id: 0,
    makerId: 0,
    displayName: '',
    dateAdded: new Date().toISOString(),
    dateUpdated: new Date().toISOString(),
  };
  newVehicleModel: VehicleModel = {
    id: 0,
    makerId: 0,
    displayName: '',
    dateAdded: new Date().toISOString(),
    dateUpdated: new Date().toISOString(),
  }


  //cities objects
  @ViewChild('Hidecityaddmodel') hidecityaddmodel: any;
  @ViewChild('showcityeditmodel') showcityeditmodel: any;
  @ViewChild('hidecityeditmodel') hidecityeditmodel: any;
  @ViewChild('showcitydeletemodel') showcitydeletemodel: any;
  @ViewChild('hidecitydeletemodel') hidecitydeletemodel: any;

  CityColumns: string[] = ['id', 'cityName', 'dateAdded', 'dateUpdated', 'actions'];
  cities: MatTableDataSource<City>;
  @ViewChild('CityTable', { static: true }) cityTable: MatTable<City>;
  @ViewChild('CityPaginator', { static: true }) cityPaginator: MatPaginator;
  @ViewChild('CitySort', { static: true }) citySort: MatSort;

  deleteCityObj: City;
  editCityObj: City = {
    id: 0,
    cityName: '',
    dateAdded: new Date().toISOString(),
    dateUpdated: new Date().toISOString(),
  };
  newCity: City = {
    id: 0,
    cityName: '',
    dateAdded: new Date().toISOString(),
    dateUpdated: new Date().toISOString(),
  }

  public counts: any;

  constructor(
    public vehicleModelService: VehicleModelService,
    public vehicleMakerService: VehicleMakerService,
    public vehicleService: VehicleService,
    public commonService: CommonService,
    public cityService: CityService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.getCounts();
    this.getVehicleMakers();
    this.getVehicleModels();
    this.getCities();
  }

  ngOnInit(): void {

  }

  getCounts() {
    this.commonService.settingCounts().subscribe(
      (response: any) => {
        this.counts = response;
        console.log(this.counts)
      },
      (error: any) => {
        console.log("Error: " + error);
      }
    )
  }

  getVehicleMakers() {
    this.vehicleMakerService.gets().subscribe(
      (response: any) => {
        this.vehicleMakers = new MatTableDataSource(response);
        this.vehicleMakers.paginator = this.vehicleMakerPaginator;
        this.vehicleMakers.sort = this.vehicleMakerSort;
        // this.vehicleMakerTable.renderRows();
      },
      (error: any) => {
        console.log("Error: " + error);
      }
    );
  }

  addVehicleMaker(makerform: NgForm) {
    // console.log(this.newVehicleMaker)
    this.vehicleMakerService.add(this.newVehicleMaker).subscribe(
      (response: any) => {
        this.vehicleMakers.data.push(response)
        this.vehicleMakers.paginator = this.vehicleMakerPaginator;
        this.vehicleMakers.sort = this.vehicleMakerSort;
        this.vehicleMakerTable.renderRows();
        this.resetVehicleMakerForm(makerform);
        this.closevehiclemakermodel.nativeElement.click();
        this.toastr.success('', 'Vehicle Maker Added Successfully');
      },
      error => {
        makerform.form.reset();
        this.toastr.error('', 'Vehicle Maker Adding Error');
        console.log("Error: " + error);
      }
    );
  }

  resetVehicleMakerForm(makerform: NgForm) {
    makerform.form.reset();
    this.newVehicleMaker = new VehicleMaker();
    this.newVehicleMaker.dateAdded = new Date().toISOString();
    this.newVehicleMaker.dateUpdated = new Date().toISOString();
  }

  showEditVehicleMakerModel(data: any) {
    this.editVehicleMakerObj = Object.assign({}, data);
    this.showvehiclemakereditmodel.nativeElement.click();
  }

  editVehicleMaker(form: NgForm) {
    this.vehicleMakerService.edit(this.editVehicleMakerObj).subscribe(
      (response: any) => {
        // console.log(response)
        for (var i = 0; i < this.vehicleMakers.data.length; i++) {
          if (this.vehicleMakers.data[i].id == this.editVehicleMakerObj.id) {
            this.vehicleMakers.data[i] = this.editVehicleMakerObj;
          }
        }
        this.vehicleMakers.paginator = this.vehicleMakerPaginator;
        this.vehicleMakers.sort = this.vehicleMakerSort;
        this.vehicleMakerTable.renderRows();

        this.hidevehiclemakereditmodel.nativeElement.click();
        this.toastr.success('', 'Vehicle Maker Updated Successfully');
      },
      error => {
        form.form.reset();
        this.toastr.error('', 'Vehicle Maker Updating Error');
        console.log("Error: " + error);
      }
    );

  }

  deleteVehicleMaker(data: any) {
    // console.log(data)
    this.deleteVehicleMakerObj = data;
    this.showvehiclemakermodel.nativeElement.click();
  }

  confirmDeleteVehicleMaker() {
    // console.log("deleteVehicleMakerObj: " + this.deleteVehicleMakerObj)
    this.vehicleMakerService.delete(this.deleteVehicleMakerObj).subscribe(
      (response: any) => {
        for (var i = 0; i < this.vehicleMakers.data.length; i++) {
          if (this.vehicleMakers.data[i].id == this.deleteVehicleMakerObj.id) {
            this.vehicleMakers.data.splice(i, 1);
          }
        }
        this.vehicleMakers.paginator = this.vehicleMakerPaginator;
        this.vehicleMakers.sort = this.vehicleMakerSort;
        this.vehicleMakerTable.renderRows();

        this.hidedeletemakermodel.nativeElement.click();
        this.toastr.success('', 'Vehicle Maker Deleted Successfully');
      },
      error => {
        this.toastr.error('', 'Error Vehicle Maker Deleting');
        console.log("Error: " + error);
      }
    );
  }

  getVehicleModels() {
    this.vehicleModelService.gets().subscribe(
      (response: any) => {
        this.vehicleModels = new MatTableDataSource(response);
        this.vehicleModels.paginator = this.vehicleModelPaginator;
        this.vehicleModels.sort = this.vehicleModelSort;
        // this.vehicleModelTable.renderRows();
      },
      (error: any) => {
        console.log("Error: " + error);
      }
    );
  }

  addVehicleModel(modelform: NgForm) {
    // console.log(this.newVehicleModel)

    this.vehicleModelService.add(this.newVehicleModel).subscribe(
      (response: any) => {
        this.vehicleModels.data.push(response)
        this.vehicleModels.paginator = this.vehicleModelPaginator;
        this.vehicleModels.sort = this.vehicleModelSort;
        this.vehicleModelTable.renderRows();

        this.closevehiclemodelmodel.nativeElement.click();
        this.toastr.success('', 'Vehicle Model Updated Successfully');
      },
      error => {
        modelform.form.reset();
        this.toastr.error('', 'Vehicle Model Updating Error');
        console.log("Error: " + error);
      }
    );
  }

  resetVehicleModelForm(modelform: NgForm) {
    modelform.form.reset();
    this.newVehicleModel = new VehicleModel();
    this.newVehicleModel.dateAdded = new Date().toISOString();
    this.newVehicleModel.dateUpdated = new Date().toISOString();
  }

  showEditVehicleModelModel(data: any) {
    this.editVehicleModelObj = Object.assign({}, data);
    this.showvehiclemodeleditmodel.nativeElement.click();
  }

  editVehicleModel(modeleditform: NgForm) {
    this.vehicleModelService.edit(this.editVehicleModelObj).subscribe(
      (response: any) => {
        for (var i = 0; i < this.vehicleModels.data.length; i++) {
          if (this.vehicleModels.data[i].id == this.editVehicleModelObj.id) {
            this.vehicleModels.data[i] = this.editVehicleModelObj;
          }
        }

        this.vehicleModels.paginator = this.vehicleModelPaginator;
        this.vehicleModels.sort = this.vehicleModelSort;
        this.vehicleModelTable.renderRows();

        //this.resetVehicleModelForm(modeleditform);
        this.hidevehiclemodeleditmodel.nativeElement.click();
        this.toastr.success('', 'Vehicle Model Added Successfully');
      },
      error => {
        modeleditform.form.reset();
        this.toastr.error('', 'Vehicle Model Adding Error');
        console.log("Error: " + error);
      }
    );
  }

  deleteVehicleModel(data: any) {
    console.log(data)
    this.deleteVehicleModelObj = data;
    this.showvehiclemodelmodel.nativeElement.click();
  }

  confirmDeleteVehicleModel() {
    // console.log("deleteVehicleModelObj: " + this.deleteVehicleModelObj)
    this.vehicleModelService.delete(this.deleteVehicleModelObj).subscribe(
      (response: any) => {
        for (var i = 0; i < this.vehicleModels.data.length; i++) {
          if (this.vehicleModels.data[i].id == this.deleteVehicleModelObj.id) {
            this.vehicleModels.data.splice(i, 1);
          }
        }
        this.vehicleModels.paginator = this.vehicleModelPaginator;
        this.vehicleModels.sort = this.vehicleModelSort;
        this.vehicleModelTable.renderRows();
        this.hidedeletemodelmodel.nativeElement.click();
        this.toastr.success('', 'Vehicle Model Deleted Successfully');
      },
      error => {
        this.toastr.error('', 'Error Vehicle Model Deleting');
        console.log("Error: " + error);
      }
    );
  }

  //cities

  getCities() {
    this.cityService.gets().subscribe(
      (response: any) => {
        this.cities = new MatTableDataSource(response);
        this.cities.paginator = this.cityPaginator;
        this.cities.sort = this.citySort;
      },
      (error: any) => {
        console.log("Error: " + error);
      }
    );
  }

  showEditCityModel(data: any) {
    this.editCityObj = Object.assign({}, data);
    this.showcityeditmodel.nativeElement.click();
  }

  editCity(form: NgForm) {
    this.cityService.edit(this.editCityObj).subscribe(
      (response: any) => {
        // console.log(response)
        for (var i = 0; i < this.cities.data.length; i++) {
          if (this.cities.data[i].id == this.editCityObj.id) {
            this.cities.data[i] = this.editCityObj;
          }
        }
        this.cities.paginator = this.cityPaginator;
        this.cities.sort = this.citySort;
        this.cityTable.renderRows();

        this.hidecityeditmodel.nativeElement.click();
        this.toastr.success('', 'City Updated Successfully');
      },
      error => {
        form.form.reset();
        this.toastr.error('', 'City Updating Error');
        console.log("Error: " + error);
      }
    );

  }

  addCity(form: NgForm) {
    this.cityService.add(this.newCity).subscribe(
      (response: any) => {
        this.cities.data.push(response)
        this.cities.paginator = this.cityPaginator;
        this.cities.sort = this.citySort;
        this.cityTable.renderRows();
        this.resetCityForm(form);
        this.hidecityaddmodel.nativeElement.click();
        this.toastr.success('', 'City Added Successfully');
      },
      error => {
        form.form.reset();
        this.toastr.error('', 'City Adding Error');
        console.log("Error: " + error);
      }
    );
  }

  resetCityForm(form: NgForm) {
    form.form.reset();
    this.newCity = new City();
    this.newCity.dateAdded = new Date().toISOString();
    this.newCity.dateUpdated = new Date().toISOString();
  }

  showDeleteCityModel(data: any) {
    this.deleteCityObj = data;
    this.showcitydeletemodel.nativeElement.click();
  }

  confirmDeleteCity() {
    this.cityService.delete(this.deleteCityObj).subscribe(
      (response: any) => {
        for (var i = 0; i < this.cities.data.length; i++) {
          if (this.cities.data[i].id == this.deleteCityObj.id) {
            this.cities.data.splice(i, 1);
          }
        }
        this.cities.paginator = this.cityPaginator;
        this.cities.sort = this.citySort;
        this.cityTable.renderRows();

        this.hidecitydeletemodel.nativeElement.click();
        this.toastr.success('', 'City Deleted Successfully');
      },
      error => {
        this.toastr.error('', 'Error City Deleting');
        console.log("Error: " + error);
      }
    );
  }

}
