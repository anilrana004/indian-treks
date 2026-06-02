module {
  public type Review = {
    id : Text;
    trekSlug : Text;
    yatraSlug : Text;
    reviewerName : Text;
    email : Text;
    rating : Nat;
    trekDate : Text;
    reviewText : Text;
    submittedAt : Int;
  };

  public type ReviewInput = {
    trekSlug : Text;
    yatraSlug : Text;
    reviewerName : Text;
    email : Text;
    rating : Nat;
    trekDate : Text;
    reviewText : Text;
  };

  public type ReviewResult = {
    #ok : Text;
    #err : Text;
  };
};
