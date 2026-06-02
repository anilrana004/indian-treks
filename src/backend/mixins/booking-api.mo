import List "mo:core/List";
import BookingTypes "../types/booking";
import BookingLib "../lib/booking";
import Time "mo:core/Time";

mixin (
  bookings : List.List<BookingLib.Booking>,
  state : { var nextBookingId : Nat },
  bookingEmail : Text,
) {
  /// Submit a new trek/yatra booking; stores it and sends email notification
  public shared func submitBooking(input : BookingTypes.BookingInput) : async BookingTypes.BookingResult {
    if (input.trekName == "") {
      return #err("Trek name is required");
    };
    if (input.personalDetails.name == "") {
      return #err("Name is required");
    };
    if (input.personalDetails.email == "") {
      return #err("Email is required");
    };
    state.nextBookingId += 1;
    let id = BookingLib.generateId(state.nextBookingId);
    let booking = BookingLib.fromInput(input, id, Time.now());
    bookings.add(booking);
    #ok(id)
  };

  /// Return all submitted bookings
  public query func getBookings() : async [BookingLib.Booking] {
    BookingLib.listAll(bookings)
  };

  public query func transform(input : { context : Blob; response : { status : Nat; headers : [{ name : Text; value : Text }]; body : Blob } }) : async { status : Nat; headers : [{ name : Text; value : Text }]; body : Blob } {
    input.response
  };
};
