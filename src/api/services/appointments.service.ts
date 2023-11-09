import { Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentRepository } from '../../database/repositories/AppointmentRepository';
import { ClientsService } from './clients.service';

@Injectable()
export class AppointmentsService {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private clientService: ClientsService,
  ) {}

  async getDoctorsAppointments(doctorId: number) {
    const doctorAppointments = await this.appointmentRepository.findMany({
      where: {
        doctor_id: doctorId,
        is_available: true,
      }
    })
    return doctorAppointments;
  }

  async getActiveAppointments() {
    const activeAppointments = await this.appointmentRepository.findMany({
      where: {
        is_available: true,
      }
    })
    return activeAppointments;
  }

  async getAppointment(appointmentId: number) {
    const appointment = await this.appointmentRepository.findUnique({
      where: {
        appointment_id: appointmentId,
        is_available: true,
      }
    })
    if (!appointment){
      throw new NotFoundException(`Information about appointment is not found`);
    }
    return appointment;
  }

  async disableAppointment(appointmentId: number) {
    await this.appointmentRepository.update({
      where: {
        appointment_id: appointmentId,
      },
      data: {
        is_available: false,
      }
    })
  }

  async bookAppointment(userId: number, appointmentId: number) {
    await this.getAppointment(appointmentId);
    await this.disableAppointment(appointmentId);
    const data = await this.clientService.addAppointment(userId,appointmentId);
    return data;
  }
}
