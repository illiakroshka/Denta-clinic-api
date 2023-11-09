import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { ClientsService } from '../clients/clients.service';
import { ClientsModule } from '../clients/clients.module';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService, ClientsService],
  imports: [ClientsModule],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
