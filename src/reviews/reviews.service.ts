import {Injectable, NotFoundException} from '@nestjs/common';
import { ReviewsRepository } from '../database/repositories/ReviewsRepository';

@Injectable()
export class ReviewsService {
  constructor(
    private reviewsRepository: ReviewsRepository,
  ) {}

  async getDoctorsReviews(doctorId: number) {
    const doctorReviews = await this.reviewsRepository.findMany({
      where: {
        doctor_id: doctorId,
      }
    })
    return doctorReviews;
  }

  async deleteReview (clientId: number, reviewId: number) {
    const review = await this.reviewsRepository.findMany({
      where: {
        client_id: clientId,
        review_id: reviewId,
      }
    })
    if (!review.length){
      throw new NotFoundException('Ви не можете видалити відкук який ви не створювали')
    }
    return this.reviewsRepository.deleteById(reviewId);
  }

  async createReview (dto ,doctorId:number, clientId: number) {
    const data = {
      doctor_id: doctorId,
      client_id: clientId,
      rating: dto.rating,
      comment: dto.comment,
    }
    return this.reviewsRepository.create(data);
  }

  async calculateAverageRating (doctorId: number) {
    const reviews = await this.reviewsRepository.findMany({
      where: {
        doctor_id: doctorId,
      }
    })

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    return averageRating;
  }
}
