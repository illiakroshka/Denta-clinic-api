import { Injectable } from '@nestjs/common';
import { DoctorsRepository } from './database/repositories/DoctorsRepository';
import { AppointmentRepository } from './database/repositories/AppointmentRepository';
import { ClientsRepository } from "./database/repositories/ClientsRepository";
import { ReviewsRepository } from "./database/repositories/ReviewsRepository";

@Injectable()
export class AppService {
  constructor(
    private doctorsRepository: DoctorsRepository,
    private appointmentRepository: AppointmentRepository,
    private clientRepository: ClientsRepository,
    private reviewsRepository: ReviewsRepository,
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

  async getDoctorAppointments(doctorId: number) {
    return this.appointmentRepository.getDoctorAppointments(doctorId);
  }

  async getAppointmentById(doctorId: number, appointmentId: number) {
    return this.appointmentRepository.getAppointmentById(doctorId, appointmentId);
  }

  async insertClient(dto: object, appointmentId: number){
    return this.clientRepository.insertClient(dto,appointmentId);
  }

  async disableAppointment(appointmentId: number) {
    await this.appointmentRepository.disableAppointment(appointmentId);
  }

  async getDoctorReviews(doctorId: number) {
    return this.reviewsRepository.getDoctorReviews(doctorId);
  }
}
