import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database.service";

@Injectable()
export class ReviewsRepository {
  constructor(
    private prisma: DatabaseService
  ) {}

  async getDoctorReviews(doctorId: number) {
   return this.prisma.reviews.findMany({
     where:{
       doctor_id: doctorId,
     }
   })
  }

  async insertDoctorReviews(dto, doctorId: number, clientId: number) {
    return this.prisma.reviews.create({
      data: {
        doctor_id: doctorId,
        client_id: clientId,
        rating: dto.rating,
        comment: dto.comment,
      }
    })
  }

  async calculateAverageRating (doctorId: number) {
    const reviews = await this.prisma.reviews.findMany({
      where: { doctor_id: doctorId },
    });

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    return averageRating;
  }

  async findReview(clientId: number) {
    return this.prisma.reviews.findMany({
      where: {
        client_id: clientId,
      }
    })
  }

  async deleteReview (reviewId: number) {
    return this.prisma.reviews.deleteMany({
      where: {
        review_id: reviewId,
      },
    });
  }
}