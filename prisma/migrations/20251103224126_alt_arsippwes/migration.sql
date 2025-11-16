/*
  Warnings:

  - Added the required column `idBidang` to the `Arsip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenis` to the `Arsip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kategori` to the `Arsip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keterangan` to the `Arsip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentang` to the `Arsip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `retensi` to the `Arsip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Arsip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `arsip` ADD COLUMN `idBidang` VARCHAR(191) NOT NULL,
    ADD COLUMN `jenis` VARCHAR(191) NOT NULL,
    ADD COLUMN `kategori` VARCHAR(191) NOT NULL,
    ADD COLUMN `keterangan` VARCHAR(191) NOT NULL,
    ADD COLUMN `rentang` VARCHAR(191) NOT NULL,
    ADD COLUMN `retensi` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL,
    MODIFY `file` LONGTEXT NOT NULL,
    MODIFY `formAs` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `formNm` LONGTEXT NOT NULL DEFAULT '',
    MODIFY `formVal` LONGTEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `bidang` MODIFY `idPimpinan` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `jabatan` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `jab` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `img` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `user` MODIFY `nip` VARCHAR(191) NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE `Arsip` ADD CONSTRAINT `Arsip_idBidang_fkey` FOREIGN KEY (`idBidang`) REFERENCES `Bidang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
