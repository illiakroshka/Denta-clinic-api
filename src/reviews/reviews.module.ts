import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { MapperModule } from '../modules/MapperModule';
import { DoctorsService } from '../doctors/doctors.service';
import {DoctorsModule} from "../doctors/doctors.module";

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, DoctorsService],
  imports: [MapperModule, DoctorsModule],
  exports: [ReviewsService],
})
export class ReviewsModule {}
