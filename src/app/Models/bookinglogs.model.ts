export class Bookinglogs {
    id: number = 0;
    bookingId: number;
    action: string;
    description: string;
    dateAdded: string = new Date().toISOString();
    dateUpdated: string = new Date().toISOString();
}
