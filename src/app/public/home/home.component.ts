import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/Models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public vehicles: Vehicle[];

  constructor(
    public vehicleService: VehicleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getVehicles()
  }

  getVehicles() {
    this.vehicleService.getApprovedVehicles().subscribe(
      (response: any) => {
        this.vehicles = response
        this.vehicles.forEach(element => {
          if (element.imagesPath != "" && element.imagesPath != null) {
            element.images = element.imagesPath.split(',');
            // console.log(element.images)
          }
        });
        // console.log(this.vehicles)
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
