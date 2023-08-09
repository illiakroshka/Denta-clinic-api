import { Injectable } from '@nestjs/common';
import {DoctorsRepository} from './database/repositories/DoctorsRepository';
import {AppointmentRepository} from './database/repositories/AppointmentRepository';

@Injectable()
export class AppService {
  constructor(
    private doctorsRepository: DoctorsRepository,
    private appointmentRepository: AppointmentRepository
  ) {}

  async getDoctors() {
    return this.doctorsRepository.getDoctors();
  }

  async getDoctorById(doctorId: number) {
    return this.doctorsRepository.getDoctorById(doctorId);
  }

  async getAppointments(){
    return this.appointmentRepository.getAppointments();
  }

  async getDoctorAppointments(doctorId: number){
    return this.appointmentRepository.getDoctorAppointments(doctorId);
  }
}
