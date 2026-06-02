import List "mo:core/List";
import BookingLib "lib/booking";
import ReviewLib "lib/review";
import BookingApi "mixins/booking-api";
import ReviewApi "mixins/review-api";

actor {
  /// Configurable destination email for booking and review notifications
  /// Configurable destination email for booking and review notifications
  let BOOKING_EMAIL : Text = "info@indiantreks.in";
  // NOTE: Authorization extension (caffeineai-authorization) is needed for My Account / trekker portal features (login, booking history, wishlist, badges).

  let bookings = List.empty<BookingLib.Booking>();
  let reviews = List.empty<ReviewLib.Review>();
  let bookingState = { var nextBookingId = 0 };
  let reviewState = { var nextReviewId = 0 };

  include BookingApi(bookings, bookingState, BOOKING_EMAIL);
  include ReviewApi(reviews, reviewState, BOOKING_EMAIL);
};

