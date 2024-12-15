-- DropIndex
DROP INDEX `products_barCode_key` ON `products`;

-- AlterTable
ALTER TABLE `products` MODIFY `barCode` VARCHAR(191) NULL,
    MODIFY `reason` VARCHAR(191) NULL;
