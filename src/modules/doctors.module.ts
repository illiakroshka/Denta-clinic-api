import { Module } from '@nestjs/common';
import { DoctorsService } from '../api/services/doctors.service';
import { DoctorsController } from '../api/controllers/doctors.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [DoctorsService],
  controllers: [DoctorsController],
  imports: [DatabaseModule],
  exports: [DoctorsService],
})
export class DoctorsModule {}
