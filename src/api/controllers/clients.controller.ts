import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ClientsService } from '../services/clients.service';
import { AuthGuard } from "../../security/auth.guard";

@Controller('clients')
export class ClientsController {
  constructor(
    private clientService: ClientsService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/profile')
  async getProfile(
    @Request() req,
  ) {
    const profile = this.clientService.getProfile(req.user.sub);
    return profile;
  }
}
