import { Injectable } from '@nestjs/common';
import { DoctorsRepository } from './database/repositories/DoctorsRepository';
import { AppointmentRepository } from './database/repositories/AppointmentRepository';
import { ClientsRepository } from './database/repositories/ClientsRepository';

@Injectable()
export class AppService {
  constructor(
    private doctorsRepository: DoctorsRepository,
  ) {}

  async getDoctors() {
    return this.doctorsRepository.getDoctors();
  }

  async getDoctorById(doctorId: number) {
    return this.doctorsRepository.getDoctorById(doctorId);
  }

  async updateDoctorRating(doctorId: number, rating: number) {
    await this.doctorsRepository.updateDoctorRating(doctorId,rating);
  }
}
