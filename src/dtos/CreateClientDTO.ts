import {IsNumber, IsString} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDTO {

  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsString()
  phone_number: string;
}