/*
  Warnings:

  - Added the required column `created_at` to the `Arsip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `Arsip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `arsip` ADD COLUMN `created_at` VARCHAR(191) NOT NULL,
    ADD COLUMN `created_by` VARCHAR(191) NOT NULL,
    ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `bidang` MODIFY `idPimpinan` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `jabatan` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `jab` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `img` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `user` MODIFY `nip` VARCHAR(191) NOT NULL DEFAULT '';
