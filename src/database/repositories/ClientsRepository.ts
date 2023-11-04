import { Injectable  } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { Prisma } from '@prisma/client'

@Injectable()
export class ClientsRepository {
  constructor (
    private prisma: DatabaseService,
  ) {}

  async createClient(dto){
    return this.prisma.clients.create({
      data:{
        first_name: dto.first_name,
        last_name: dto.last_name,
        phone_number: dto.phone_number,
        password: dto.password,
      }
    })
  }

  async checkClient (phoneNumber: string) {
    return this.prisma.clients.findFirst({
      where: { phone_number: phoneNumber }
    })
  }

  async findMany (data: Prisma.clientsFindManyArgs) {
    return this.prisma.clients.findMany({
      ...data,
    })
  }

  async update(args: Prisma.clientsUpdateArgs) {
    return this.prisma.clients.update({
      ...args,
    })
  }
}