import List "mo:core/List";
import ReviewTypes "../types/review";
import CommonTypes "../types/common";

module {
  public type Review = ReviewTypes.Review;
  public type ReviewInput = ReviewTypes.ReviewInput;
  public type ReviewResult = ReviewTypes.ReviewResult;

  /// Generate a unique review ID from a counter
  public func generateId(counter : Nat) : CommonTypes.ReviewId {
    "REVIEW-" # Nat.toText(counter)
  };

  /// Create a new Review record from input and generated ID
  public func fromInput(
    input : ReviewInput,
    id : CommonTypes.ReviewId,
    submittedAt : CommonTypes.Timestamp,
  ) : Review {
    {
      id;
      trekSlug = input.trekSlug;
      yatraSlug = input.yatraSlug;
      reviewerName = input.reviewerName;
      email = input.email;
      rating = input.rating;
      trekDate = input.trekDate;
      reviewText = input.reviewText;
      submittedAt;
    }
  };

  /// Build email body text for a review notification
  public func toEmailBody(review : Review) : Text {
    "Review ID: " # review.id # "\n" #
    "Trek: " # review.trekSlug # "\n" #
    "Reviewer: " # review.reviewerName # "\n" #
    "Rating: " # Nat.toText(review.rating) # "/5\n" #
    "Review: " # review.reviewText
  };
};
