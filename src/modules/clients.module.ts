import { Module } from '@nestjs/common';
import { ClientsService } from '../api/services/clients.service';
import { ClientsController } from '../api/controllers/clients.controller';

@Module({
  providers: [ClientsService],
  controllers: [ClientsController],
  exports: [ClientsService],
})
export class ClientsModule {}
