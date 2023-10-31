import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ClientsRepository } from '../database/repositories/ClientsRepository';
import { CreateClientDTO } from '../dtos/CreateClientDTO';
import { AlreadyRegisteredException } from '../utils/exceptions/AlreadyRegisteredException';
import { JwtService } from '@nestjs/jwt';
import { AppointmentRepository } from '../database/repositories/AppointmentRepository';

@Injectable()
export class AuthService {
  constructor(
    private clientRepository: ClientsRepository,
    private appointmentRepository: AppointmentRepository,
    private jwtService: JwtService,
  ) {}

  async createClient(dto: CreateClientDTO) {
    if (await this.clientRepository.checkClient(dto.phone_number)) {
      throw new AlreadyRegisteredException()
    }
    return this.clientRepository.createClient(dto);
  }

  async login(phoneNumber: string, password: string) {
    const client = await this.clientRepository.checkClient(phoneNumber);
    if (client?.password !== password) {
      throw new UnauthorizedException('Incorrect phone number or password');
    }
    const payload = {sub: client.client_id, username: client.first_name}
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  async checkAppointment(clientId: number) {
    const { appointment_id } = await this.clientRepository.checkAppointments(clientId);
    if (!appointment_id) {
      throw new NotFoundException(`You don't have appointments yet`)
    }
    return this.appointmentRepository.getAppointment(appointment_id);
  }
}
