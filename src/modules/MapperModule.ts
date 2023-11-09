import { Module } from '@nestjs/common';
import { ReviewsMapper } from '../mappers/ReviewsMapper';

@Module({
  providers: [
    ReviewsMapper,
  ],
  exports: [
    ReviewsMapper,
  ],
})
export class MapperModule {}