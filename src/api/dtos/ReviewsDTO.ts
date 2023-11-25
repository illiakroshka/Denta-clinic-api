import { IsNumber, IsString, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewsDto {
  @ApiProperty()
  @IsNumber()
  @Min(0, { message: 'Rating must be at least 0' })
  @Max(5, { message: 'Rating must be at most 5' })
    rating: number;

  @ApiProperty()
  @IsString()
    comment: string;
}