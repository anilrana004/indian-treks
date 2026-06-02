import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AdditionalRequests {
    needsMule: boolean;
    needsHotelPostTrek: boolean;
    needsPickup: boolean;
    specialAssistance: string;
    hearAboutUs: string;
    needsPorter: boolean;
    hotelPreNights: bigint;
    needsHotelPreTrek: boolean;
    hotelPostNights: bigint;
}
export interface BookingInput {
    additionalRequests: AdditionalRequests;
    children: bigint;
    healthDetails: HealthDetails;
    personalDetails: PersonalDetails;
    trekName: string;
    trekSlug: string;
    adults: bigint;
    totalPrice: bigint;
    batchDate: string;
}
export interface HealthDetails {
    dietaryRequirements: string;
    hasMedicalCondition: boolean;
    trekedAbove3500m: boolean;
    comfortableWalking6to8h: boolean;
    medicalConditionDetails: string;
    tshirtSize: string;
}
export interface Booking {
    id: string;
    additionalRequests: AdditionalRequests;
    submittedAt: bigint;
    children: bigint;
    healthDetails: HealthDetails;
    personalDetails: PersonalDetails;
    trekName: string;
    trekSlug: string;
    adults: bigint;
    totalPrice: bigint;
    batchDate: string;
}
export type BookingResult = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export interface PersonalDetails {
    dob: string;
    name: string;
    whatsapp: string;
    email: string;
    emergencyContactRelation: string;
    gender: string;
    emergencyContactPhone: string;
    emergencyContactName: string;
}
export interface ReviewInput {
    reviewText: string;
    reviewerName: string;
    email: string;
    trekDate: string;
    trekSlug: string;
    rating: bigint;
    yatraSlug: string;
}
export type ReviewResult = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export interface backendInterface {
    getBookings(): Promise<Array<Booking>>;
    submitBooking(input: BookingInput): Promise<BookingResult>;
    submitReview(input: ReviewInput): Promise<ReviewResult>;
    transform(input: {
        context: Uint8Array;
        response: {
            status: bigint;
            body: Uint8Array;
            headers: Array<{
                value: string;
                name: string;
            }>;
        };
    }): Promise<{
        status: bigint;
        body: Uint8Array;
        headers: Array<{
            value: string;
            name: string;
        }>;
    }>;
}
