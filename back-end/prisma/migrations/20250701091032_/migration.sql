-- AlterTable
ALTER TABLE `User` ADD COLUMN `address` JSON NULL,
    ADD COLUMN `conditions` BOOLEAN NULL,
    ADD COLUMN `newsletter` BOOLEAN NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NULL;
