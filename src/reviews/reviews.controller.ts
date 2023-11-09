import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards, UsePipes, ValidationPipe
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { AuthGuard } from '../security/auth.guard';
import { ReviewsMapper } from '../mappers/ReviewsMapper';
import { CreateReviewsDto } from '../dtos/ReviewsDTO';
import { DoctorsService } from '../doctors/doctors.service';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private reviewsService: ReviewsService,
    private reviewMapper: ReviewsMapper,
    private doctorsService: DoctorsService,
  ) {}

  @Get('/:doctorId')
  async getDoctorsReviews(@Param('doctorId', ParseIntPipe) doctorId: number) {
    const doctorReviews = await this.reviewsService.getDoctorsReviews(doctorId);
    return this.reviewMapper.getDoctorReviews(doctorReviews);
  }

  @UseGuards(AuthGuard)
  @Delete('/:doctorId/:reviewId')
  async deleteReview (
    @Param('doctorId', ParseIntPipe) doctorId: number,
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @Request() req: any,
  ) {
    await this.doctorsService.getDoctor(doctorId);
    return this.reviewsService.deleteReview(req.user.sub, reviewId, doctorId);
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('/:doctorId')
  async createReview(
    @Param('doctorId', ParseIntPipe) doctorId: number,
    @Body() dto: CreateReviewsDto,
    @Request() req: any,
  ) {
    await this.doctorsService.getDoctor(doctorId);
    const review = await this.reviewsService.createReview(dto, doctorId, req.user.sub);
    return review;
  }
}
