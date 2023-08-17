import { CreateClientDTO } from "../../dtos/CreateClientDTO";

export const clientStub = (): CreateClientDTO => {
  return {
    first_name: 'Marcus',
    last_name: 'Aurelius',
    phone_number: '123456789',
  }
}