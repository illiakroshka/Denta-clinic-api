import { Injectable , NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database.service';

@Injectable()
export class ClientsRepository {
  constructor (
    private prisma: DatabaseService,
  ) {}

  async bookAppointment(clientId: number, appointmentId: number) {
    const appointment = await this.prisma.appointments.findUnique({
      where: {
        appointment_id: appointmentId
      }
    });
    if (!appointment) {
      throw new NotFoundException('Information about appointment is not found');
    }
    return this.prisma.clients.update({
      data: {
        appointment_id: appointmentId,
      },
      where:{
        client_id: clientId,
      }
    })
  }

  async createClient(dto){
    return this.prisma.clients.create({
      data:{
        first_name: dto.first_name,
        last_name: dto.last_name,
        phone_number: dto.phone_number,
        password: dto.password,
      }
    })
  }

  async checkClient (phoneNumber: string) {
    return this.prisma.clients.findFirst({
      where: { phone_number: phoneNumber }
    })
  }

  async checkAppointments (clientId: number) {
    return this.prisma.clients.findFirst({
      where: { client_id: clientId },
    })
  }
}