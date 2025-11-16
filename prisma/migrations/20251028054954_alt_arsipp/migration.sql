/*
  Warnings:

  - You are about to drop the column `kd` on the `arsip` table. All the data in the column will be lost.
  - You are about to alter the column `created_at` on the `arsip` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `arsip` DROP COLUMN `kd`,
    MODIFY `formAs` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `formNm` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `formVal` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `bidang` MODIFY `idPimpinan` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `jabatan` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `jab` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `img` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `user` MODIFY `nip` VARCHAR(191) NOT NULL DEFAULT '';
