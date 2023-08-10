import {Global, Module} from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DoctorsRepository } from './repositories/DoctorsRepository';
import {AppointmentRepository} from "./repositories/AppointmentRepository";
import {ClientsRepository} from "./repositories/ClientsRepository";

@Global()
@Module({
  providers: [DatabaseService, DoctorsRepository, AppointmentRepository, ClientsRepository],
  exports: [DatabaseService, DoctorsRepository, AppointmentRepository, ClientsRepository]
})
export class DatabaseModule {}
