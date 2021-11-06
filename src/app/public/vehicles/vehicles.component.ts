import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Vehicle } from 'src/app/Models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  public vehicles: Vehicle[];
  constructor(
    public vehicleService: VehicleService,
    private toastr: ToastrService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.getVehicles(params.maker)
      }
      );
  }

  getVehicles(maker: number) {
    this.vehicleService.getVehiclesByMaker(maker).subscribe(
      (response: any) => {
        this.vehicles = response
        this.vehicles.forEach(element => {
          if (element.imagesPath != "" && element.imagesPath != null) {
            element.images = element.imagesPath.split(',');
            // console.log(element.images)
          }
        });
      },
      (error: any) => {
        console.log("Error: " + error);
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

}
