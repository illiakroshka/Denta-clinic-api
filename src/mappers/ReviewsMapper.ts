import { DbReview } from '../database/entities/DbReview';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewsMapper {
  getDoctorReview (review: DbReview) {
    return {
      doctorId: review.doctor_id,
      rating: review.rating,
      comment: review.comment,
      reviewId: review.review_id,
    };
  }

  getDoctorReviews (reviews : DbReview[]) {
    return reviews.map((review) => this.getDoctorReview(review));
  }
}