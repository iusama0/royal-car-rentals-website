import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
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


  public VehicleMakerAddForm = new FormGroup({
    displayName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z- ]{2,30}$")]),
  });

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

  public VehicleMakerEditForm = new FormGroup({
    displayName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z- ]{2,30}$")]),
  });

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

  public vehicleModelAddForm = new FormGroup({
    makerId: new FormControl('', [Validators.required]),
    displayName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9- ]{2,30}$")])
  });

  public vehicleModelEditForm = new FormGroup({
    makerId: new FormControl('', [Validators.required]),
    displayName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9- ]{2,30}$")])
  });


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

  public cityAddForm = new FormGroup({
    cityName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z- ]{2,30}$")]),
  });
  public cityEditForm = new FormGroup({
    cityName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z- ]{2,30}$")]),
  });


  public isLoading: boolean = false;
  public isAlreadyEntered: boolean = false;
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

  public hasError = (formName: string, controlName: string, errorName: string) => {

    if (formName == 'addmaker') {
      return this.VehicleMakerAddForm.controls[controlName].hasError(errorName);
    } else if (formName == 'editmaker') {
      return this.VehicleMakerEditForm.controls[controlName].hasError(errorName);
    } else if (formName == 'addmodel') {
      return this.vehicleModelAddForm.controls[controlName].hasError(errorName);
    } else if (formName == 'editmodel') {
      return this.vehicleModelEditForm.controls[controlName].hasError(errorName);
    } else if (formName == 'addCity') {
      return this.cityAddForm.controls[controlName].hasError(errorName);
    } else if (formName == 'editCity') {
      return this.cityEditForm.controls[controlName].hasError(errorName);
    }

    return null;
  }

  getCounts() {
    this.commonService.settingCounts().subscribe(
      (response: any) => {
        this.counts = response;
      },
      (error: any) => {
        console.log("Error: ", error);
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
        console.log("Error: ", error);
      }
    );
  }

  addVehicleMaker(formValue: any, formDirective: FormGroupDirective) {
    this.isLoading = true;


    var _data = this.vehicleMakers.data.filter(x => x.displayName.toLowerCase() == formValue.displayName.toLowerCase());
    if (_data.length > 0) {
      this.isLoading = false;
      this.isAlreadyEntered = true;
      return;
    } else {
      this.isAlreadyEntered = false;
    }



    this.newVehicleMaker.displayName = formValue.displayName;
    this.vehicleMakerService.add(this.newVehicleMaker).subscribe(
      (response: any) => {
        this.vehicleMakers.data.push(response)
        this.vehicleMakers.paginator = this.vehicleMakerPaginator;
        this.vehicleMakers.sort = this.vehicleMakerSort;
        this.vehicleMakerTable.renderRows();
        this.resetVehicleMakerForm(formDirective);
        formDirective.resetForm();
        this.closevehiclemakermodel.nativeElement.click();
        this.toastr.success('', 'Vehicle Maker Added Successfully');
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.toastr.error('', 'Vehicle Maker Adding Error');
        console.log("Error: ", error);
      }
    );
  }

  resetVehicleMakerForm(formDirective: FormGroupDirective) {
    this.isLoading = false;
    this.isAlreadyEntered = false;
    formDirective.resetForm();
    this.newVehicleMaker = new VehicleMaker();
    this.newVehicleMaker.dateAdded = new Date().toISOString();
    this.newVehicleMaker.dateUpdated = new Date().toISOString();
  }

  showEditVehicleMakerModel(data: any) {
    this.editVehicleMakerObj = Object.assign({}, data);
    this.VehicleMakerEditForm.setValue({ displayName: this.editVehicleMakerObj.displayName });
    this.showvehiclemakereditmodel.nativeElement.click();
  }

  editVehicleMaker(formValue: any, formDirective: FormGroupDirective) {
    this.isLoading = true;

    var _data = this.vehicleMakers.data.filter(x => x.displayName.toLowerCase() == formValue.displayName.toLowerCase());
    if (_data.length > 0) {
      this.isLoading = false;
      this.isAlreadyEntered = true;
      return;
    } else {
      this.isAlreadyEntered = false;
    }

    this.editVehicleMakerObj.displayName = formValue.displayName;
    this.vehicleMakerService.edit(this.editVehicleMakerObj).subscribe(
      (response: any) => {
        for (var i = 0; i < this.vehicleMakers.data.length; i++) {
          if (this.vehicleMakers.data[i].id == this.editVehicleMakerObj.id) {
            this.vehicleMakers.data[i] = this.editVehicleMakerObj;
          }
        }
        this.vehicleMakers.paginator = this.vehicleMakerPaginator;
        this.vehicleMakers.sort = this.vehicleMakerSort;
        this.vehicleMakerTable.renderRows();

        this.resetVehicleMakerEditForm(formDirective);


        this.hidevehiclemakereditmodel.nativeElement.click();
        this.toastr.success('', 'Vehicle Maker Updated Successfully');
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.toastr.error('', 'Vehicle Maker Updating Error');
        console.log("Error: ", error);
      }
    );

  }

  resetVehicleMakerEditForm(formDirective: FormGroupDirective) {
    formDirective.resetForm();
    this.isAlreadyEntered = false;
    this.isLoading = false;
    this.editVehicleMakerObj = new VehicleMaker();
  }

  deleteVehicleMaker(data: any) {
    this.deleteVehicleMakerObj = data;
    this.showvehiclemakermodel.nativeElement.click();
  }

  confirmDeleteVehicleMaker() {
    this.isLoading = true;
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
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.toastr.error('', 'Error Vehicle Maker Deleting');
        console.log("Error: ", error);
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

  addVehicleModel(formValue: any, formDirective: FormGroupDirective) {
    this.isLoading = true;


    var _data = this.vehicleModels.data.filter(x => x.makerId == formValue.makerId && x.displayName.toLowerCase() == formValue.displayName.toLowerCase());
    if (_data.length > 0) {
      this.isLoading = false;
      this.isAlreadyEntered = true;
      return;
    } else {
      this.isAlreadyEntered = false;
    }

    this.newVehicleModel.makerId = formValue.makerId;
    this.newVehicleModel.displayName = formValue.displayName;
    this.vehicleModelService.add(this.newVehicleModel).subscribe(
      (response: any) => {
        this.vehicleModels.data.push(response)
        this.vehicleModels.paginator = this.vehicleModelPaginator;
        this.vehicleModels.sort = this.vehicleModelSort;
        this.vehicleModelTable.renderRows();
        this.resetVehicleAddModelForm(formDirective);
        this.closevehiclemodelmodel.nativeElement.click();
        this.toastr.success('', 'Vehicle Model Updated Successfully');
      },
      error => {
        this.isLoading = false;
        this.toastr.error('', 'Vehicle Model Updating Error');
        console.log("Error: ", error);
      }
    );
  }

  resetVehicleAddModelForm(formDirective: FormGroupDirective) {
    formDirective.resetForm();
    this.isLoading = false;
    this.isAlreadyEntered = false;
    this.newVehicleModel = new VehicleModel();
    this.newVehicleModel.dateAdded = new Date().toISOString();
    this.newVehicleModel.dateUpdated = new Date().toISOString();
  }

  showEditVehicleModelModel(data: any) {
    this.editVehicleModelObj = Object.assign({}, data);
    this.vehicleModelEditForm.setValue({ makerId: this.editVehicleModelObj.makerId, displayName: this.editVehicleModelObj.displayName });
    this.showvehiclemodeleditmodel.nativeElement.click();
  }

  resetVehicleEditModelForm(formDirective: FormGroupDirective) {
    formDirective.resetForm();
    this.isLoading = false;
    this.isAlreadyEntered = false;
    this.editVehicleModelObj = new VehicleModel();
  }

  editVehicleModel(formValue: any, formDirective: FormGroupDirective) {
    this.isLoading = true;

    var _data = this.vehicleModels.data.filter(x => x.makerId == formValue.makerId && x.displayName.toLowerCase() == formValue.displayName.toLowerCase());
    if (_data.length > 0) {
      this.isLoading = false;
      this.isAlreadyEntered = true;
      return;
    } else {
      this.isAlreadyEntered = false;
    }

    this.editVehicleModelObj.makerId = formValue.makerId;
    this.editVehicleModelObj.displayName = formValue.displayName;
    this.vehicleModelService.edit(this.editVehicleModelObj).subscribe(
      (response: any) => {
        for (var i = 0; i < this.vehicleModels.data.length; i++) {
          if (this.vehicleModels.data[i].id == this.editVehicleModelObj.id) {
            this.vehicleModels.data[i] = response;
          }
        }

        this.vehicleModels.paginator = this.vehicleModelPaginator;
        this.vehicleModels.sort = this.vehicleModelSort;
        this.vehicleModelTable.renderRows();

        this.resetVehicleEditModelForm(formDirective);
        this.hidevehiclemodeleditmodel.nativeElement.click();
        this.toastr.success('', 'Vehicle Model Added Successfully');
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.toastr.error('', 'Vehicle Model Adding Error');
        console.log("Error: ", error);
      }
    );
  }

  deleteVehicleModel(data: any) {
    this.deleteVehicleModelObj = data;
    this.showvehiclemodelmodel.nativeElement.click();
  }

  confirmDeleteVehicleModel() {
    this.isLoading = true;
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
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.toastr.error('', 'Error Vehicle Model Deleting');
        console.log("Error: ", error);
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
        console.log("Error: ", error);
      }
    );
  }

  showEditCityModel(data: any) {
    this.isAlreadyEntered = false;
    this.editCityObj = Object.assign({}, data);
    this.cityEditForm.setValue({ cityName: this.editCityObj.cityName });
    this.showcityeditmodel.nativeElement.click();
  }

  editCity(formValue: any, formDirective: FormGroupDirective) {
    this.isLoading = true;
    var _data = this.cities.data.filter(x => x.cityName.toLowerCase() == formValue.cityName.toLowerCase());
    if (_data.length > 0) {
      this.isLoading = false;
      this.isAlreadyEntered = true;
      return;
    } else {
      this.isAlreadyEntered = false;
    }

    this.editCityObj.cityName = formValue.cityName;
    this.cityService.edit(this.editCityObj).subscribe(
      (response: any) => {
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
        this.isAlreadyEntered = false;
        this.isLoading = false;
      },
      error => {
        this.isAlreadyEntered = false;
        this.isLoading = false;
        this.toastr.error('', 'City Updating Error');
        console.log("Error: ", error);
      }
    );
  }

  resetEditCityForm(formDirective: FormGroupDirective) {
    formDirective.resetForm();
    this.isLoading = false;
    this.isAlreadyEntered = false;
    this.editCityObj = new City();
  }

  addCity(formValue: any, formDirective: FormGroupDirective) {
    this.isLoading = true;
    var _data = this.cities.data.filter(x => x.cityName.toLowerCase() == formValue.cityName.toLowerCase());
    if (_data.length > 0) {
      this.isLoading = false;
      this.isAlreadyEntered = true;
      return;
    } else {
      this.isAlreadyEntered = false;
    }

    this.newCity.cityName = formValue.cityName;
    this.cityService.add(this.newCity).subscribe(
      (response: any) => {
        this.cities.data.push(response)
        this.cities.paginator = this.cityPaginator;
        this.cities.sort = this.citySort;
        this.cityTable.renderRows();
        this.resetAddCityForm(formDirective);
        formDirective.resetForm();
        this.hidecityaddmodel.nativeElement.click();
        this.toastr.success('', 'City Added Successfully');
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.toastr.error('', 'City Adding Error');
        console.log("Error: ", error);
      }
    );
  }

  resetAddCityForm(formDirective: FormGroupDirective) {
    formDirective.resetForm();
    this.isAlreadyEntered = false;
    this.isLoading = false;
    this.newCity = new City();
    this.newCity.dateAdded = new Date().toISOString();
    this.newCity.dateUpdated = new Date().toISOString();
  }

  showDeleteCityModel(data: any) {
    this.deleteCityObj = data;
    this.showcitydeletemodel.nativeElement.click();
  }

  confirmDeleteCity() {
    this.isLoading = true;
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
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.toastr.error('', 'Error City Deleting');
        console.log("Error: ", error);
      }
    );
  }

}
