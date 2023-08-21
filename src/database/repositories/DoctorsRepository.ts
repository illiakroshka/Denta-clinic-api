import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';

@Injectable()
export class DoctorsRepository {
  constructor (
    private prisma: DatabaseService,
  ) {}

  async getDoctors() {
    return this.prisma.doctors.findMany();
  }

  async getDoctorById(doctorId: number) {
    return this.prisma.doctors.findUnique({
      where:{
        doctor_id: doctorId
      }
    })
  }

  async updateDoctorRating(doctorId: number, rating: number) {
    await this.prisma.doctors.update({
      where: {doctor_id: doctorId },
      data: {average_rating: rating},
    });
  }
}