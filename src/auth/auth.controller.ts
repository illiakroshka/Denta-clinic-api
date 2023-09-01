import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateClientDTO } from '../dtos/CreateClientDTO';
import { AuthGuard } from '../security/auth.guard';
import { LoginDTO } from '../dtos/LoginDTO';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('/register')
  async register(@Body() body: CreateClientDTO){
    return this.authService.createClient(body)
  }

  @UsePipes(new ValidationPipe())
  @Post('/login')
  async login (@Body() body: LoginDTO) {
    return this.authService.login(body.phone_number,body.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.authService.checkAppointment(req.user.sub);
  }
}
