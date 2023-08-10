import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';

@Injectable()
export class ClientsRepository {
  constructor (
    private prisma: DatabaseService,
  ) {}

  async insertClient0(client){
    await this.prisma.clients.create({
      data: client
    })
  }

  async insertClient(dto,appointmentId){
    await this.prisma.clients.create({
      data: {
        first_name: dto.first_name,
        last_name: dto.last_name,
        phone_number: dto.phone_number,
        appointment: {
          connect: {
            appointment_id: appointmentId
          }
        }
      }
    })
  }
}