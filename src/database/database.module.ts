import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DoctorsRepository } from './repositories/DoctorsRepository';
import { AppointmentRepository } from "./repositories/AppointmentRepository";
import { ClientsRepository } from "./repositories/ClientsRepository";
import { ReviewsRepository } from "./repositories/ReviewsRepository";

@Global()
@Module({
  providers: [DatabaseService, DoctorsRepository, AppointmentRepository, ClientsRepository, ReviewsRepository],
  exports: [DatabaseService, DoctorsRepository, AppointmentRepository, ClientsRepository, ReviewsRepository]
})
export class DatabaseModule {}
