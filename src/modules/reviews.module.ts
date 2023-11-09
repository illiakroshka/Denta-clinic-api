import { Module } from '@nestjs/common';
import { ReviewsController } from '../api/controllers/reviews.controller';
import { ReviewsService } from '../api/services/reviews.service';
import { MapperModule } from './MapperModule';
import { DoctorsService } from '../api/services/doctors.service';
import {DoctorsModule} from "./doctors.module";

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, DoctorsService],
  imports: [MapperModule, DoctorsModule],
  exports: [ReviewsService],
})
export class ReviewsModule {}
