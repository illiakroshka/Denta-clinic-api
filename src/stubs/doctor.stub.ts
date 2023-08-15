import { doctors } from "@prisma/client";

export const doctorStub = (): doctors => {
  return {
    "doctor_id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "speciality": "Cardiologist",
    "experience": 10,
    "specialization": "Heart Specialist",
    "degree": "MD",
    "about": "Dr. John Doe is a skilled cardiologist...",
    "profile_picture": null
  };
};