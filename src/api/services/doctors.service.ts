import { Injectable, NotFoundException } from '@nestjs/common';
import { DoctorsRepository } from '../../database/repositories/DoctorsRepository';

@Injectable()
export class DoctorsService {
  constructor (
   private doctorRepository: DoctorsRepository,
  ) {}

  async getDoctors () {
    return this.doctorRepository.findMany({});
  }

  async getDoctor (doctorId: number) {
    const doctor = await this.doctorRepository.findById(doctorId);
    if (!doctor) {
      throw new NotFoundException('Doctor with such id is not found');
    }
    return doctor;
  }

  async updateDoctorRating (doctorId: number, rating: number) {
    await this.doctorRepository.updateById(doctorId, {
      average_rating: rating,
    });
  }
}
