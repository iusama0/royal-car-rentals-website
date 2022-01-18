export class Feedback {
    id: number;
    bookingId: number;
    rating: number;
    comment: string;
    dateAdded: string = new Date().toISOString();
    dateUpdated: string = new Date().toISOString();
}
