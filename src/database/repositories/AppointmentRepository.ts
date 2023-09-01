import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';

@Injectable()
export class AppointmentRepository {
  constructor(
    private prisma: DatabaseService,
  ) {}

  async getAppointments() {
    return this.prisma.appointments.findMany({
      where:{
        is_available: true,
      }
    });
  }

  async getDoctorAppointments(doctorId: number){
    return this.prisma.appointments.findMany({
      where:{
        doctor_id: doctorId,
        is_available: true,
      }
    })
  }

  async getAppointmentById(doctorId : number, appointmentId: number){
    return this.prisma.appointments.findUnique({
      where:{
        doctor_id: doctorId,
        appointment_id: appointmentId,
        is_available: true,
      }
    })
  }

  async disableAppointment(appointmentId: number) {
    await this.prisma.appointments.update({
      where: {
        appointment_id: appointmentId,
      },
      data: {
        is_available: false,
      }
    })
  }

  async getAppointment(appointmentId: number) {
    return this.prisma.appointments.findUnique({
      where:{ appointment_id: appointmentId }
    })
  }
}