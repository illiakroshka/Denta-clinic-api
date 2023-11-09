import { appointments } from '@prisma/client';

export const appointmentStub = (): appointments => {
  return {
    appointment_id: 1,
    doctor_id: 1,
    appointment_datetime: new Date('2023-08-30T15:45:00.000Z'),
    is_available: true,
  };
};