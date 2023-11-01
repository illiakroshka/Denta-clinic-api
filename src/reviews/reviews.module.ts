import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { AppService } from '../app.service';
import {MapperModule} from '../modules/MapperModule';

@Module({
  imports: [MapperModule],
  controllers: [ReviewsController],
  providers: [ReviewsService, AppService]
})
export class ReviewsModule {}
