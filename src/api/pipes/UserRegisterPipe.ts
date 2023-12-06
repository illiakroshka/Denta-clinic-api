import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateClientDTO } from '../dtos/CreateClientDTO';
import { ClientsService } from '../services/clients.service';
import { AlreadyRegisteredException } from '../../utils/exceptions/AlreadyRegisteredException';

@Injectable()
export class UserRegisterPipe implements PipeTransform {
  constructor (
    private clientService: ClientsService,
  ) {}

  async transform (data: CreateClientDTO) {
    const client = await this.clientService.checkClient(data.phone_number);
    if (client) {
      throw new AlreadyRegisteredException();
    }
    return data;
  }
}