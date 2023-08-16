import { Injectable , NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database.service';

@Injectable()
export class ClientsRepository {
  constructor (
    private prisma: DatabaseService,
  ) {}

  async insertClient(dto, appointmentId){
    const appointment = await this.prisma.appointments.findUnique({
      where: {
        appointment_id: appointmentId
      }
    });
    if (!appointment) {
      throw new NotFoundException('Information about appointment is not found');
    }
    return this.prisma.clients.create({
      data: {
        first_name: dto.first_name,
        last_name: dto.last_name,
        phone_number: dto.phone_number,
        appointment: {
          connect: {
            appointment_id: appointmentId,
          }
        }
      }
    });
  }
}