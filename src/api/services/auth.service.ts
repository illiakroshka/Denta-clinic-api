import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateClientDTO } from '../dtos/CreateClientDTO';
import { JwtService } from '@nestjs/jwt';
import { ClientsService } from './clients.service';

@Injectable()
export class AuthService {
  constructor (
    private clientService: ClientsService,
    private jwtService: JwtService,
  ) {}

  async createClient (dto: CreateClientDTO) {
    return this.clientService.createClient(dto);
  }

  async login (phoneNumber: string, password: string) {
    const client = await this.clientService.checkClient(phoneNumber);
    if (client?.password !== password) {
      throw new UnauthorizedException('Incorrect phone number or password');
    }
    const payload = { sub: client.client_id, username: client.first_name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
