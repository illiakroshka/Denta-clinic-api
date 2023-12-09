import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateClientDTO } from '../dtos/CreateClientDTO';
import { JwtService } from '@nestjs/jwt';
import { ClientsService } from './clients.service';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from '../dtos/LoginDTO';

@Injectable()
export class AuthService {
  constructor (
    private clientService: ClientsService,
    private jwtService: JwtService,
  ) {}

  async hashPassword (password: string) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async validatePassword (password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async createClient (dto: CreateClientDTO) {
    const hashedPassword = await this.hashPassword(dto.password);
    return this.clientService.createClient(dto, hashedPassword);
  }

  async login (dto: LoginDTO) {
    const client = await this.clientService.checkClient(dto.phone_number);
    const isValid = await this.validatePassword(dto.password, client.password);
    if (!isValid) {
      throw new UnauthorizedException('Incorrect phone number or password');
    }
    const payload = { sub: client.client_id, username: client.first_name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
