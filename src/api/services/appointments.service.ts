import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from '../../database/repositories/AppointmentRepository';
import { ClientsService } from './clients.service';

@Injectable()
export class AppointmentsService {
  constructor (
    private appointmentRepository: AppointmentRepository,
    private clientService: ClientsService,
  ) {}

  async getDoctorsAppointments (doctorId: number) {
    return this.appointmentRepository.findMany({
      where: {
        doctor_id: doctorId,
        is_available: true,
      },
    });
  }

  async getActiveAppointments () {
    return this.appointmentRepository.findMany({
      where: {
        is_available: true,
      },
    });
  }

  async getAppointment (appointmentId: number) {
    return this.appointmentRepository.findUnique({
      where: {
        appointment_id: appointmentId,
        is_available: true,
      },
    });
  }

  async disableAppointment (appointmentId: number) {
    await this.appointmentRepository.update({
      where: {
        appointment_id: appointmentId,
      },
      data: {
        is_available: false,
      },
    });
  }

  async bookAppointment (userId: number, appointmentId: number) {
    const appointmentData = await this.getAppointment(appointmentId);
    await this.disableAppointment(appointmentId);
    await this.clientService.addAppointment(userId, appointmentId);
    return appointmentData;
  }
}
