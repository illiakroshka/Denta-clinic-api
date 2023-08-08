import {Global, Module} from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DoctorsRepository } from './repositories/DoctorsRepository';
import {AppointmentRepository} from "./repositories/AppointmentRepository";

@Global()
@Module({
  providers: [DatabaseService, DoctorsRepository, AppointmentRepository],
  exports: [DatabaseService, DoctorsRepository, AppointmentRepository]
})
export class DatabaseModule {}
