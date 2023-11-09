import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateClientDTO } from '../dtos/CreateClientDTO';
import { LoginDTO } from '../dtos/LoginDTO';

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('/register')
  async register (@Body() body: CreateClientDTO) {
    return this.authService.createClient(body);
  }

  @UsePipes(new ValidationPipe())
  @Post('/login')
  async login (@Body() body: LoginDTO) {
    return this.authService.login(body.phone_number, body.password);
  }
}
