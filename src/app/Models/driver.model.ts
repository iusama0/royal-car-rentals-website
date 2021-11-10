export class Driver {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    isActive: boolean;
    availability: boolean;
    licenceNo: string;
    profilePicture: string;
    dateAdded: string = new Date().toISOString();
    dateUpdated: string = new Date().toISOString();
}