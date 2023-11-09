import {CreateReviewsDto} from "../../api/dtos/ReviewsDTO";

export const reviewStub = (): CreateReviewsDto => {
  return {
    rating: 5,
    comment: 'Excellent doctor!'
  };
}