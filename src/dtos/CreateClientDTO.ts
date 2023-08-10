import {IsNumber, IsString} from "class-validator";

export class CreateClientDTO {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  phone_number: string;
}