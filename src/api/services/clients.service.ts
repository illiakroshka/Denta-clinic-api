import { Injectable } from '@nestjs/common';
import { ClientsRepository } from '../../database/repositories/ClientsRepository';
import { CreateClientDTO } from '../dtos/CreateClientDTO';

@Injectable()
export class ClientsService {
  constructor (
    private clientRepository: ClientsRepository
  ) {}

  async checkClient (phoneNumber: string) {
    return this.clientRepository.findFirst({
      where: {
        phone_number: phoneNumber,
      },
    });
  }

  async createClient (data: CreateClientDTO) {
    return this.clientRepository.create({
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      password: data.password,
    });
  }

  async getProfile (clientId: number) {
    return this.clientRepository.findMany({
      where: {
        client_id: clientId,
      },
    });
  }

  async addAppointment (clientId: number, appointmentId: number) {
    return this.clientRepository.update({
      data: {
        appointment_id: appointmentId,
      },
      where: {
        client_id: clientId,
      },
    });
  }
}
