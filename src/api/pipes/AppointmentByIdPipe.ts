import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { AppointmentRepository } from '../../database/repositories/AppointmentRepository';

@Injectable()
export class AppointmentByIdPipe implements PipeTransform {
  constructor (
    private appointmentRepository: AppointmentRepository,
  ) {}
  async transform (appointmentId: number) {
    const appointment = await this.appointmentRepository.findUnique({
      where: {
        appointment_id: appointmentId,
        is_available: true,
      },
    });
    if (!appointment) {
      throw new NotFoundException('Appointment with such id is not found');
    }
    return appointmentId;
  }
}