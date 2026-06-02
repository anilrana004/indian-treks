module {
  /// Build a JSON payload for a booking email notification
  public func buildBookingPayload(toEmail : Text, subject : Text, body : Text) : Text {
    "{\"to\":\"" # toEmail # "\",\"subject\":\"" # subject # "\",\"body\":\"" # body # "\"}"
  };

  /// Build a JSON payload for a review email notification
  public func buildReviewPayload(toEmail : Text, subject : Text, body : Text) : Text {
    "{\"to\":\"" # toEmail # "\",\"subject\":\"" # subject # "\",\"body\":\"" # body # "\"}"
  };
};
