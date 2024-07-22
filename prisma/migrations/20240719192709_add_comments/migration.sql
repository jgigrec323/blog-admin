/*
  Warnings:

  - Added the required column `author` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comment` ADD COLUMN `author` VARCHAR(191) NOT NULL;
