import { Module } from '@nestjs/common';
import { AppointmentsController } from '../api/controllers/appointments.controller';
import { AppointmentsService } from '../api/services/appointments.service';
import { ClientsService } from '../api/services/clients.service';
import { ClientsModule } from './clients.module';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService, ClientsService],
  imports: [ClientsModule],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
