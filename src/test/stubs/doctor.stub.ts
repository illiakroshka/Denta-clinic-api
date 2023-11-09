import { doctors } from '@prisma/client';

export const doctorStub = (): doctors => {
  return {
    doctor_id: -1,
    first_name: 'doctorFirsName',
    last_name: 'doctorLastName',
    speciality: 'speciality',
    experience: 0,
    specialization: 'specialization',
    degree: 'degree',
    about: 'about',
    average_rating: 4.5,
    profile_picture: null,
  };
};