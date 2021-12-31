import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VehicleMaker } from 'src/app/Models/vehicle-maker.model';
import { VehicleModel } from 'src/app/Models/vehicle-model.model';
import { Vehicle } from 'src/app/Models/vehicle.model';
import { VehicleMakerService } from 'src/app/services/vehicle-maker.service';
import { VehicleModelService } from 'src/app/services/vehicle-model.service';
import { VehicleService } from 'src/app/services/vehicle.service';


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  public vehicles: Vehicle[] = [];
  public vehicleMakers: VehicleMaker[] = [];
  public vehicleModels: VehicleModel[] = [];
  public vehicleModelsYears = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];

  public makerId: number;
  public modelId: number = 0;
  public modelYear: number = 0;
  public isLoading: boolean = false;


  public filterForm = new FormGroup({
    makerId: new FormControl(),
    modelId: new FormControl('0'),
    modelYear: new FormControl('0')
  });

  constructor(
    public vehicleModelService: VehicleModelService,
    public vehicleMakerService: VehicleMakerService,
    public vehicleService: VehicleService,
    public activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.makerId = params.maker;
        // this.filterForm.setValue({
        //   makerId: this.makerId,
        //   modelId: 0,
        //   modelYear: 0
        // });

        this.getVehicles();
        this.getVehicleModels(this.makerId)
      }
      );
  }


  getVehicles() {
    this.isLoading = true;
    this.vehicleService.getFilterVehicles(this.makerId, this.modelId, this.modelYear).subscribe(
      (response: any) => {
        this.vehicles = response
        this.vehicles.forEach(element => {
          if (element.imagesPath != "" && element.imagesPath != null) {
            element.images = element.imagesPath.split(',');
            // console.log(element.images)
          }
        });
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
        console.log("Error: ", error);
      }
    );
  }

  showalert(x?: string) {
    if (x != "" && x != null) {
      return x.split(',')[0];
    } else {
      return x;
    }
  }

  viewVehicle(data: any) {
    let info = JSON.stringify(data);
    this.router.navigate(["public/vehicle"], { queryParams: { info } });
  }

  getVehicleModels(id: number) {
    this.vehicleModelService.getByMakerId(id).subscribe(
      (response: any) => {
        this.vehicleModels = response;
      },
      (error: any) => {
        console.log("Error: ", error);
      }
    );
  }

  filterVehicle(formValue: any, formDirective: FormGroupDirective) {
    this.isLoading = true;
    this.vehicles = [];
    console.log(formValue);
    this.modelId = formValue.modelId ? formValue.modelId : 0;
    this.modelYear = formValue.modelYear ? formValue.modelYear : 0;
    this.getVehicles();
    // formDirective.resetForm();
  }
}
