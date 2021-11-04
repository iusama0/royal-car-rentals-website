import { Component, OnInit } from '@angular/core';
import { VehicleMaker } from 'src/app/Models/vehicle-maker.model';
import { VehicleModel } from 'src/app/Models/vehicle-model.model';
import { VehicleMakerService } from 'src/app/services/vehicle-maker.service';
import { VehicleModelService } from 'src/app/services/vehicle-model.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-common-section',
  templateUrl: './common-section.component.html',
  styleUrls: ['./common-section.component.css']
})
export class CommonSectionComponent implements OnInit {
  public vehicleMakers: VehicleMaker[];
  public vehicleModels: VehicleModel[];
  constructor(
    public vehicleService: VehicleService,
    public vehicleMakerService: VehicleMakerService,
    public vehicleModelService: VehicleModelService
  ) { }

  ngOnInit(): void {
    this.getVehicleMakers();
    this.getVehicleModels();
  }

  getVehicleMakers() {
    this.vehicleMakerService.gets().subscribe(
      (response: any) => {
        this.vehicleMakers = response;
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
      },
      (error: any) => {
        console.log("Error: " + error);
      }
    );
  }

}
