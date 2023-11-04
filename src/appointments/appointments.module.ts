import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { ClientsService } from '../clients/clients.service';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService, ClientsService]
})
export class AppointmentsModule {}
