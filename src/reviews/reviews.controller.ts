import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards, UsePipes, ValidationPipe
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { AppService } from "../app.service";
import { AuthGuard } from "../security/auth.guard";
import { ReviewsMapper } from "../mappers/ReviewsMapper";
import {CreateReviewsDto} from "../dtos/ReviewsDTO";

@Controller('reviews')
export class ReviewsController {
  constructor(
    private reviewsService: ReviewsService,
    private appService: AppService,
    private reviewMapper: ReviewsMapper,
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
  ){
    const doctor = await this.appService.getDoctorById(doctorId);
    if (!doctor) {
      throw new NotFoundException(`Doctor is not found`);
    }
    return this.reviewsService.deleteReview(req.user.sub, reviewId);
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('/:doctorId')
  async createReview(
    @Param('doctorId', ParseIntPipe) doctorId: number,
    @Body() dto: CreateReviewsDto,
    @Request() req: any,
  ){
    const doctor = await this.appService.getDoctorById(doctorId);
    if (!doctor) {
      throw new NotFoundException(`Doctor is not found`);
    }
    const review = await this.reviewsService.createReview(dto,doctorId,req.user.sub);
    const averageRating = await this.reviewsService.calculateAverageRating(doctorId);
    await this.appService.updateDoctorRating(doctorId, averageRating);
    return review;
  }
}
