import { Customer } from "./customer.model";
import { Driver } from "./driver.model";
import { Vehicle } from "./vehicle.model";

export class Booking {
    id: number;
    vehicleId: number;
    customerId: number;
    driverId: number;
    cityId: number;
    withDriver: boolean;
    status: string;
    startDate: string;
    startTime: number;
    endDate: string;
    endTime: number;
    dateAdded: string;
    dateUpdated: string;
    customer: Customer;
    driver: Driver;
    vehicle: Vehicle;
}
