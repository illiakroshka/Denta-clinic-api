import { IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
    phone_number: string;

  @IsString()
    password: string;
}