import Debug "mo:core/Debug";

module {
  public type PersonalDetails = {
    name : Text;
    email : Text;
    whatsapp : Text;
    dob : Text;
    gender : Text;
    emergencyContactName : Text;
    emergencyContactPhone : Text;
    emergencyContactRelation : Text;
  };

  public type HealthDetails = {
    hasMedicalCondition : Bool;
    medicalConditionDetails : Text;
    trekedAbove3500m : Bool;
    comfortableWalking6to8h : Bool;
    dietaryRequirements : Text;
    tshirtSize : Text;
  };

  public type AdditionalRequests = {
    specialAssistance : Text;
    needsPorter : Bool;
    needsMule : Bool;
    needsPickup : Bool;
    needsHotelPreTrek : Bool;
    hotelPreNights : Nat;
    needsHotelPostTrek : Bool;
    hotelPostNights : Nat;
    hearAboutUs : Text;
  };

  public type Booking = {
    id : Text;
    trekName : Text;
    trekSlug : Text;
    batchDate : Text;
    adults : Nat;
    children : Nat;
    totalPrice : Nat;
    personalDetails : PersonalDetails;
    healthDetails : HealthDetails;
    additionalRequests : AdditionalRequests;
    submittedAt : Int;
  };

  public type BookingInput = {
    trekName : Text;
    trekSlug : Text;
    batchDate : Text;
    adults : Nat;
    children : Nat;
    totalPrice : Nat;
    personalDetails : PersonalDetails;
    healthDetails : HealthDetails;
    additionalRequests : AdditionalRequests;
  };

  public type BookingResult = {
    #ok : Text;
    #err : Text;
  };
};
