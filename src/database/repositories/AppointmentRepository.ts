import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AppointmentRepository {
  constructor (
    private prisma: DatabaseService,
  ) {}

  async findMany (data: Prisma.appointmentsFindManyArgs) {
    return this.prisma.appointments.findMany({
      ...data,
    });
  }

  async findUnique (data: Prisma.appointmentsFindUniqueOrThrowArgs) {
    return this.prisma.appointments.findUnique({
      ...data,
    });
  }

  async update (args: Prisma.appointmentsUpdateArgs) {
    return this.prisma.appointments.update({
      ...args,
    });
  }
}