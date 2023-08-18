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
}