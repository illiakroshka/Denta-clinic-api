import { Injectable  } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClientsRepository {
  constructor (
    private prisma: DatabaseService,
  ) {}

  async create (data: Prisma.clientsUncheckedCreateInput) {
    return this.prisma.clients.create({
      data,
    });
  }

  async findFirst (data) {
    return this.prisma.clients.findFirst({
      ...data,
    });
  }

  async findMany (data: Prisma.clientsFindManyArgs) {
    return this.prisma.clients.findMany({
      ...data,
    });
  }

  async update (args: Prisma.clientsUpdateArgs) {
    return this.prisma.clients.update({
      ...args,
    });
  }
}