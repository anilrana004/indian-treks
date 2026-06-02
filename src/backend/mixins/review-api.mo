import List "mo:core/List";
import ReviewTypes "../types/review";
import ReviewLib "../lib/review";
import Time "mo:core/Time";

mixin (
  reviews : List.List<ReviewLib.Review>,
  state : { var nextReviewId : Nat },
  bookingEmail : Text,
) {
  /// Submit a new trek/yatra review; stores it and sends email notification
  public shared func submitReview(input : ReviewTypes.ReviewInput) : async ReviewTypes.ReviewResult {
    if (input.reviewerName == "") {
      return #err("Reviewer name is required");
    };
    if (input.rating == 0 or input.rating > 5) {
      return #err("Rating must be between 1 and 5");
    };
    state.nextReviewId += 1;
    let id = ReviewLib.generateId(state.nextReviewId);
    let review = ReviewLib.fromInput(input, id, Time.now());
    reviews.add(review);
    #ok(id)
  };
};
