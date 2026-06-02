import List "mo:core/List";
import BookingTypes "../types/booking";
import CommonTypes "../types/common";
import Time "mo:core/Time";

module {
  public type Booking = BookingTypes.Booking;
  public type BookingInput = BookingTypes.BookingInput;
  public type BookingResult = BookingTypes.BookingResult;

  /// Generate a unique booking ID from a counter
  public func generateId(counter : Nat) : CommonTypes.BookingId {
    "BOOKING-" # Nat.toText(counter)
  };

  /// Create a new Booking record from input and generated ID
  public func fromInput(
    input : BookingInput,
    id : CommonTypes.BookingId,
    submittedAt : CommonTypes.Timestamp,
  ) : Booking {
    {
      id;
      trekName = input.trekName;
      trekSlug = input.trekSlug;
      batchDate = input.batchDate;
      adults = input.adults;
      children = input.children;
      totalPrice = input.totalPrice;
      personalDetails = input.personalDetails;
      healthDetails = input.healthDetails;
      additionalRequests = input.additionalRequests;
      submittedAt;
    }
  };

  /// Build email body text for a booking notification
  public func toEmailBody(booking : Booking) : Text {
    "Booking ID: " # booking.id # "\n" #
    "Trek: " # booking.trekName # "\n" #
    "Batch Date: " # booking.batchDate # "\n" #
    "Adults: " # Nat.toText(booking.adults) # "\n" #
    "Children: " # Nat.toText(booking.children) # "\n" #
    "Total Price: " # Nat.toText(booking.totalPrice) # "\n" #
    "Name: " # booking.personalDetails.name # "\n" #
    "Email: " # booking.personalDetails.email # "\n" #
    "WhatsApp: " # booking.personalDetails.whatsapp
  };

  /// Get all bookings as immutable array
  public func listAll(bookings : List.List<Booking>) : [Booking] {
    bookings.toArray()
  };
};
