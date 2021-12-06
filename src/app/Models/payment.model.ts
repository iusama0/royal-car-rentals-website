export class Payment {
    id: number;
    bookingId: number;
    totalAmount: number = 0;
    paidAmount: number = 0;
    discountAmount: number = 0;
    dateAdded: string;
    dateUpdated: string;
}
