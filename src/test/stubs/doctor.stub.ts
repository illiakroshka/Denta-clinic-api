import { doctors } from "@prisma/client";

export const doctorStub = (): doctors => {
  return {
    "doctor_id": 0,
    "first_name": "doctorFirsName",
    "last_name": "doctorLastName",
    "speciality": "speciality",
    "experience": 0,
    "specialization": "specialization",
    "degree": "degree",
    "about": "about",
    "profile_picture": null
  };
};