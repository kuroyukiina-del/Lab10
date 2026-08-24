/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Message` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Message_email_key" ON "Message"("email");
