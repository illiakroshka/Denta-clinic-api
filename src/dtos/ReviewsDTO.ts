import {IsNumber, IsString, Min, Max} from "class-validator";

export class CreateReviewsDto {
  @IsNumber()
  @Min(0, { message: 'Rating must be at least 0' })
  @Max(5, { message: 'Rating must be at most 5' })
  rating: number;

  @IsString()
  comment: string;
}