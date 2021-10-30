import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  constructor(
    public vehicleService: VehicleService,
    private toastr: ToastrService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    
   }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.queryParams.info);
  }

}
