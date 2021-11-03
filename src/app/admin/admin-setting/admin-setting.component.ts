import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { VehicleMaker } from 'src/app/Models/vehicle-maker.model';
import { VehicleModel } from 'src/app/Models/vehicle-model.model';
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

  VehicleMakerColumns: string[] = ['id', 'displayName', 'storageValue', 'dateAdded', 'dateUpdated', 'actions'];
  vehicleMakers: MatTableDataSource<VehicleMaker>;
  @ViewChild('VehicleModelTable', { static: true }) vehicleMakerTable: MatTable<VehicleMaker>;
  @ViewChild('VehicleMakerPaginator', { static: true }) vehicleMakerPaginator: MatPaginator;
  @ViewChild('VehicleMakerSort', { static: true }) vehicleMakerSort: MatSort;

  deleteVehicleMakerObj: VehicleMaker;
  newVehicleMaker: VehicleMaker = {
    id: 0,
    displayName: '',
    storageValue: '',
    dateAdded: new Date().toISOString(),
    dateUpdated: new Date().toISOString(),
  }

  //model objects
  @ViewChild('closevehiclemodelmodel') closevehiclemodelmodel: any;
  @ViewChild('showvehiclemodelmodel') showvehiclemodelmodel: any;
  @ViewChild('hidedeletemodelmodel') hidedeletemodelmodel: any;

  VehicleModelColumns: string[] = ['id', 'makerId', 'displayName', 'storageValue', 'dateAdded', 'dateUpdated', 'actions'];
  vehicleModels: MatTableDataSource<VehicleModel>;
  @ViewChild('VehicleModelTable', { static: true }) vehicleModelTable: MatTable<VehicleModel>;
  @ViewChild('VehicleModelPaginator', { static: true }) vehicleModelPaginator: MatPaginator;
  @ViewChild('VehicleModelSort', { static: true }) vehicleModelSort: MatSort;

  deleteVehicleModelObj: VehicleModel;
  newVehicleModel: VehicleModel = {
    id: 0,
    makerId: 0,
    displayName: '',
    storageValue: '',
    dateAdded: new Date().toISOString(),
    dateUpdated: new Date().toISOString(),
  }


  //==============================================



  constructor(
    public vehicleService: VehicleService,
    public vehicleMakerService: VehicleMakerService,
    public vehicleModelService: VehicleModelService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getVehicleMakers();
    this.getVehicleModels();
  }

  ngAfterViewInit(): void {

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
    console.log(this.newVehicleMaker)

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

  editVehicleMaker(data: any) {
    console.log(this.editVehicleMaker)
  }

  deleteVehicleMaker(data: any) {
    console.log(data)
    this.deleteVehicleMakerObj = data;
    this.showvehiclemakermodel.nativeElement.click();

  }

  confirmDeleteVehicleMaker() {
    console.log("deleteVehicleMakerObj: " + this.deleteVehicleMakerObj)
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
    console.log(this.newVehicleModel)

    this.vehicleModelService.add(this.newVehicleModel).subscribe(
      (response: any) => {
        this.vehicleModels.data.push(response)
        this.vehicleModels.paginator = this.vehicleModelPaginator;
        this.vehicleModels.sort = this.vehicleModelSort;
        this.vehicleModelTable.renderRows();
        this.resetVehicleModelForm(modelform);
        this.closevehiclemodelmodel.nativeElement.click();
        this.toastr.success('', 'Vehicle Model Added Successfully');
      },
      error => {
        modelform.form.reset();
        this.toastr.error('', 'Vehicle Model Adding Error');
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

  editVehicleModel(data: any) {
    console.log(data)
  }

  deleteVehicleModel(data: any) {
    console.log(data)
    this.deleteVehicleModelObj = data;
    this.showvehiclemodelmodel.nativeElement.click();

  }

  confirmDeleteVehicleModel() {
    console.log("deleteVehicleModelObj: " + this.deleteVehicleModelObj)
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

}
