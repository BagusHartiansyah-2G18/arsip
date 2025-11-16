/*
  Warnings:

  - Added the required column `kd` to the `Arsip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `arsip` ADD COLUMN `kd` VARCHAR(191) NOT NULL,
    MODIFY `formAs` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `formNm` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `formVal` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `bidang` MODIFY `idPimpinan` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `jabatan` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `jab` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `img` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `user` MODIFY `nip` VARCHAR(191) NOT NULL DEFAULT '';
