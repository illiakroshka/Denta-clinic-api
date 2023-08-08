import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';

@Injectable()
export class AppointmentRepository {
  constructor(
    private prisma: DatabaseService,
  ) {}

  async getAppointments() {
    return this.prisma.appointments.findMany({
      where:{
        is_available: true
      }
    });
  }
}