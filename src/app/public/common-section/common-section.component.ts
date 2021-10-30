import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-common-section',
  templateUrl: './common-section.component.html',
  styleUrls: ['./common-section.component.css']
})
export class CommonSectionComponent implements OnInit {

  constructor(
    public vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
  }

}
