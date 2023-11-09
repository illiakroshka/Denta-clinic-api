import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DoctorsRepository {
  constructor (
    private prisma: DatabaseService,
  ) {}

  include = {
    appointments: true,
  };

  async update (args: Prisma.doctorsUpdateArgs) {
    return this.prisma.doctors.update({
      ...args,
    });
  }

  async updateById (id: number, data: Prisma.doctorsUncheckedUpdateInput) {
    return this.prisma.doctors.update({
      where: {
        doctor_id: id,
      },
      data,
    });
  }

  async findById (id: number) {
    return this.prisma.doctors.findFirst({
      include: this.include,
      where: {
        doctor_id: id,
      },
    });
  }

  async findMany (args: Prisma.doctorsFindManyArgs) {
    return this.prisma.doctors.findMany({
      include: this.include,
      ...args,
    });
  }
}