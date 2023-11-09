import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReviewsRepository {
  constructor (
    private prisma: DatabaseService
  ) {}

  async findMany (data: Prisma.reviewsFindManyArgs) {
    return this.prisma.reviews.findMany({
      ...data,
    });
  }

  async deleteById (id: number) {
    return this.prisma.reviews.delete({
      where: {
        review_id: id,
      },
    });
  }

  async create (data: Prisma.reviewsUncheckedCreateInput) {
    return this.prisma.reviews.create({
      data,
    });
  }
}