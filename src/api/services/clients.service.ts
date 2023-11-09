import { Injectable } from '@nestjs/common';
import { ClientsRepository } from '../../database/repositories/ClientsRepository';

@Injectable()
export class ClientsService {
  constructor(
    private clientRepository: ClientsRepository
  ) {}

  async getProfile(clientId: number) {
    const profile = await this.clientRepository.findMany({
      where: {
        client_id: clientId,
      }
    })
    return profile;
  }

  async addAppointment(clientId: number, appointmentId: number) {
    const data = await this.clientRepository.update({
      data: {
        appointment_id: appointmentId,
      },
      where:{
        client_id: clientId,
      }
    })
    return data;
  }
}
