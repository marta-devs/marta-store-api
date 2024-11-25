/*
  Warnings:

  - You are about to drop the `model` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `model`;

-- CreateTable
CREATE TABLE `tb_model` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
