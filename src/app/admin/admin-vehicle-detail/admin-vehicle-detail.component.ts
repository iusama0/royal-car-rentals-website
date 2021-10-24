import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Vehicle } from 'src/app/Models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';


@Component({
  selector: 'app-admin-vehicle-detail',
  templateUrl: './admin-vehicle-detail.component.html',
  styleUrls: ['./admin-vehicle-detail.component.css']
})
export class AdminVehicleDetailComponent implements OnInit {
  vehicle: Vehicle;
  constructor(
    public vehicleService: VehicleService,
    private toastr: ToastrService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      this.vehicle = JSON.parse(params["user"]);
      console.log(JSON.parse(params["user"]));
    });

  }

}
