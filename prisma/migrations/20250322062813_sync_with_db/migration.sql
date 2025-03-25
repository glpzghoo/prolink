/*
  Warnings:

  - You are about to alter the column `rating` on the `review` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - A unique constraint covering the columns `[id]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `message` to the `review` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "clientStatus" AS ENUM ('accepted', 'denied', 'waiting');

-- CreateEnum
CREATE TYPE "SalaryType" AS ENUM ('MONTH', 'HOUR', 'DAY');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('ACTIVE', 'CLOSED', 'DRAFT');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CLIENT', 'FREELANCER');

-- AlterTable
ALTER TABLE "otp" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "review" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "message" TEXT NOT NULL,
ALTER COLUMN "rating" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "skill" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "companyLocation" TEXT NOT NULL DEFAULT 'Улаанбаатар',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL,
ALTER COLUMN "salaryType" SET DEFAULT 'HOUR';

-- CreateTable
CREATE TABLE "featuredSkills" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "endedAt" TIMESTAMP(3),
    "present" BOOLEAN NOT NULL DEFAULT false,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "featuredSkills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT 'ACTIVE',
    "experienced" BOOLEAN NOT NULL,
    "jobLocation" TEXT NOT NULL DEFAULT 'Улаанбаатар',
    "jobPostView" INTEGER NOT NULL DEFAULT 0,
    "salary" INTEGER NOT NULL,
    "salaryRate" "SalaryType" NOT NULL,
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "posterId" TEXT NOT NULL,

    CONSTRAINT "job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobApplication" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "freelancerId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cancelled" BOOLEAN NOT NULL DEFAULT false,
    "clientStatus" "clientStatus" NOT NULL DEFAULT 'waiting',

    CONSTRAINT "jobApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reportUser" (
    "id" TEXT NOT NULL,
    "reason" TEXT,
    "reportedUserId" TEXT NOT NULL,
    "reporterUserId" TEXT NOT NULL,

    CONSTRAINT "reportUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_jobToskill" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_jobToskill_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_jobToskill_B_index" ON "_jobToskill"("B");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- AddForeignKey
ALTER TABLE "featuredSkills" ADD CONSTRAINT "featuredSkills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "featuredSkills" ADD CONSTRAINT "featuredSkills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobApplication" ADD CONSTRAINT "jobApplication_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobApplication" ADD CONSTRAINT "jobApplication_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobApplication" ADD CONSTRAINT "jobApplication_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reportUser" ADD CONSTRAINT "reportUser_reportedUserId_fkey" FOREIGN KEY ("reportedUserId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reportUser" ADD CONSTRAINT "reportUser_reporterUserId_fkey" FOREIGN KEY ("reporterUserId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_jobToskill" ADD CONSTRAINT "_jobToskill_A_fkey" FOREIGN KEY ("A") REFERENCES "job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_jobToskill" ADD CONSTRAINT "_jobToskill_B_fkey" FOREIGN KEY ("B") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
