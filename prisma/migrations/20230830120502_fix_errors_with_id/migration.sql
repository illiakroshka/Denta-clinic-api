/*
  Warnings:

  - The primary key for the `appointments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `appointment_id` column on the `appointments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `doctor_id` column on the `appointments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `clients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `client_id` column on the `clients` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `appointment_id` column on the `clients` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `doctors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `doctor_id` column on the `doctors` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `reviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `review_id` column on the `reviews` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `doctor_id` column on the `reviews` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_appointment_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_doctor_id_fkey";

-- AlterTable
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_pkey",
DROP COLUMN "appointment_id",
ADD COLUMN     "appointment_id" SERIAL NOT NULL,
DROP COLUMN "doctor_id",
ADD COLUMN     "doctor_id" INTEGER,
ADD CONSTRAINT "appointments_pkey" PRIMARY KEY ("appointment_id");

-- AlterTable
ALTER TABLE "clients" DROP CONSTRAINT "clients_pkey",
DROP COLUMN "client_id",
ADD COLUMN     "client_id" SERIAL NOT NULL,
DROP COLUMN "appointment_id",
ADD COLUMN     "appointment_id" INTEGER,
ADD CONSTRAINT "clients_pkey" PRIMARY KEY ("client_id");

-- AlterTable
ALTER TABLE "doctors" DROP CONSTRAINT "doctors_pkey",
DROP COLUMN "doctor_id",
ADD COLUMN     "doctor_id" SERIAL NOT NULL,
ADD CONSTRAINT "doctors_pkey" PRIMARY KEY ("doctor_id");

-- AlterTable
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_pkey",
DROP COLUMN "review_id",
ADD COLUMN     "review_id" SERIAL NOT NULL,
DROP COLUMN "doctor_id",
ADD COLUMN     "doctor_id" INTEGER,
ADD CONSTRAINT "reviews_pkey" PRIMARY KEY ("review_id");

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("doctor_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("appointment_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("doctor_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
