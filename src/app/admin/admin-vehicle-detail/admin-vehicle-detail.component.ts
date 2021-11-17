import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { City } from 'src/app/Models/city.model';
import { VehicleMaker } from 'src/app/Models/vehicle-maker.model';
import { VehicleModel } from 'src/app/Models/vehicle-model.model';
import { Vehicle } from 'src/app/Models/vehicle.model';
import { CityService } from 'src/app/services/city.service';
import { VehicleMakerService } from 'src/app/services/vehicle-maker.service';
import { VehicleModelService } from 'src/app/services/vehicle-model.service';
import { VehicleService } from 'src/app/services/vehicle.service';


@Component({
  selector: 'app-admin-vehicle-detail',
  templateUrl: './admin-vehicle-detail.component.html',
  styleUrls: ['./admin-vehicle-detail.component.css']
})
export class AdminVehicleDetailComponent implements OnInit {
  @ViewChild('modelYear', { static: true }) modelYear: any;
  @ViewChild('hideeditmodel') hideeditmodel: any;
  @ViewChild('showpicturemodel') showpicturemodel: any;
  @ViewChild('hidepicturemodel') hidepicturemodel: any;
  @ViewChild('hideuploadpicturemodel') hideuploadpicturemodel: any;

  public isLoading: boolean = false;

  public editVehicleForm = new FormGroup({
    makerId: new FormControl('', [Validators.required]),
    modelId: new FormControl('', [Validators.required]),
    cityId: new FormControl('', [Validators.required]),
    modelYear: new FormControl('', [Validators.required, Validators.pattern("^([0-9]{4})$")]),
    registrationNumber: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9-. ]{2,30}$")]),
    color: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9-. ]{2,30}$")]),
    // color: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.pattern("^([0-9]{4,5})$")]),
    availability: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required])
  });

  vehicle: Vehicle;
  editVehicleObj: Vehicle;
  images: string[] = [];
  imagesCopy: string[] = [];
  files: string[] = [];
  deletePictureName: string;
  fileMessage = '';

  public cities: City[];
  public vehicleMakers: VehicleMaker[];
  public vehicleModels: VehicleModel[];
  public vehicleModelsFilter: VehicleModel[];

  public optionsValue = [
    {
      value: true,
      text: "True"
    },
    {
      value: false,
      text: "False"
    }
  ];

  constructor(
    public vehicleMakerService: VehicleMakerService,
    public vehicleModelService: VehicleModelService,
    public vehicleService: VehicleService,
    public activatedRoute: ActivatedRoute,
    public cityService: CityService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.vehicle = JSON.parse(this.activatedRoute.snapshot.queryParams._data);
    this.editVehicleObj = Object.assign({}, this.vehicle);

    if (this.vehicle.imagesPath != "" && this.vehicle.imagesPath != null) {
      this.images = this.vehicle.imagesPath.split(',');
    }

    this.getVehicleMakers();
    this.getVehicleModels();
    this.getCities();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editVehicleForm.controls[controlName].hasError(errorName);
  }

  showEditModel() {
    this.editVehicleObj = Object.assign({}, this.vehicle);

    this.editVehicleForm.setValue({
      makerId: this.editVehicleObj.makerId,
      modelId: this.editVehicleObj.modelId,
      cityId: this.editVehicleObj.cityId,
      modelYear: this.editVehicleObj.modelYear,
      registrationNumber: this.editVehicleObj.registrationNumber,
      color: this.editVehicleObj.color,
      price: this.editVehicleObj.price,
      availability: this.editVehicleObj.availability,
      status: this.editVehicleObj.status
    });

    // this.showeditmodel.nativeElement.click();
    setTimeout(() => {
      this.modelYear.nativeElement.focus();
    }, 600);
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
        this.vehicleModels = this.vehicleModelsFilter = response;
        this.changeVehicleMacker(this.editVehicleObj.makerId);
      },
      (error: any) => {
        console.log("Error: " + error);
      }
    );
  }

  getCities() {
    this.cityService.gets().subscribe(
      (response: any) => {
        this.cities = response;
      },
      (error: any) => {
        console.log("Error: " + error);
      }
    );
  }

  resetForm(formDirective: FormGroupDirective) {
    this.isLoading = false;
    formDirective.resetForm();
    this.editVehicleObj = new Vehicle();
  }

  editVehicle(formValue: any, formDirective: FormGroupDirective) {

    this.isLoading = true;
    this.editVehicleObj.makerId = formValue.makerId;
    this.editVehicleObj.modelId = formValue.modelId;
    this.editVehicleObj.cityId = formValue.cityId;
    this.editVehicleObj.modelYear = formValue.modelYear;
    this.editVehicleObj.registrationNumber = formValue.registrationNumber;
    this.editVehicleObj.color = formValue.color;
    this.editVehicleObj.price = formValue.price;
    this.editVehicleObj.availability = formValue.availability;
    this.editVehicleObj.status = formValue.status;

    console.log(this.editVehicleObj)

    this.vehicleService.editVehicle(this.editVehicleObj).subscribe(
      (response: any) => {
        this.vehicle = Object.assign({}, this.editVehicleObj);
        this.resetForm(formDirective);
        this.hideeditmodel.nativeElement.click();
        this.toastr.success('', 'Vehicle Updated Successfully');
      },
      error => {
        this.isLoading = false;
        this.toastr.error('', 'Vehicle Updating Error');
        console.log("Error: " + error);
      }
    );
  }

  removePicture(name: string) {
    this.deletePictureName = name;
    this.showpicturemodel.nativeElement.click();
  }

  confirmDeletePicture() {
    this.isLoading = true;
    // console.log(this.deletePictureName)
    this.imagesCopy = this.images;
    let index = this.imagesCopy.findIndex(d => d === this.deletePictureName); //find index in your array
    this.imagesCopy.splice(index, 1);//remove element from array

    this.vehicle.imagesPath = this.imagesCopy.join();
    this.vehicleService.editVehicle(this.vehicle).subscribe(
      (response: any) => {
        this.isLoading = false;
        this.images = this.imagesCopy;
        this.hidepicturemodel.nativeElement.click();
        this.toastr.success('', 'Deleted Successfully');
      },
      error => {
        this.isLoading = false;
        this.vehicle.imagesPath = this.images.join();
        this.toastr.error('', 'Deleting Error');
        console.log("Error: " + error);
      }
    );

  }

  onFileChange(event: any) {
    this.files = [];
    var fileCount = event.target.files.length + this.images.length;

    if (fileCount <= 3) {
      this.fileMessage = '';
      for (var i = 0; i < event.target.files.length; i++) {
        this.files.push(event.target.files[i]);
      }
    } else {
      this.fileMessage = "You can select only " + (3 - this.images.length) + " file"
      //this.uploadImagesInput.nativeElement.value = '';
    }
  }

  UploadPicture() {
    this.isLoading = true;
    this.editVehicleObj = Object.assign({}, this.vehicle);
    this.vehicleService.uploadVehiclePicture(this.editVehicleObj, this.files).subscribe(
      (response) => {
        this.isLoading = false;
        let _data = JSON.stringify(response);
        this.router.navigate(["admin/vehicle-detail"], { queryParams: { _data } });
      },
      error => {
        this.isLoading = false;
        console.log("Error: " + error);
      }
    );
  }

  changeVehicleMacker(data: number) {
    this.vehicleModelsFilter = this.vehicleModels.filter(x => x.makerId == data);
  }
}