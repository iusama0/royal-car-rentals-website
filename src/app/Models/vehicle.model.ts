import { VehicleMaker } from "./vehicle-maker.model";
import { VehicleModel } from "./vehicle-model.model";

export class Vehicle {
    id: number;
    makerId: number;
    modelId: number;
    modelYear: number;
    registrationNumber: string;
    color: string;
    status: string;
    availability: boolean;
    price: number;
    imagesPath: string;
    dateAdded: string;
    dateUpdated: string;
    images: string[];
    maker: VehicleMaker;
    model: VehicleModel;
}