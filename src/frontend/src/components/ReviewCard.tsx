import { BadgeCheck, Star, ThumbsUp } from "lucide-react";
import type { TrekReview } from "../types";

interface ReviewCardProps {
  review: TrekReview;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div
      className="flex-shrink-0 w-72 bg-card rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-smooth"
      data-ocid="review.card"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
          {review.avatar ? (
            <img
              src={review.avatar}
              alt={review.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            review.name.charAt(0).toUpperCase()
          )}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-foreground text-sm truncate">
              {review.name}
            </span>
            {review.verified && (
              <BadgeCheck className="w-4 h-4 text-primary flex-shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={`star-${star}`}
                className={`w-3 h-3 ${
                  star <= review.rating
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground"
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">
              {review.date}
            </span>
          </div>
        </div>
      </div>
      <p className="text-sm text-foreground line-clamp-4 leading-relaxed">
        {review.text}
      </p>
      <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
        <ThumbsUp className="w-3 h-3" />
        <span>{review.helpfulVotes} found helpful</span>
      </div>
    </div>
  );
}
