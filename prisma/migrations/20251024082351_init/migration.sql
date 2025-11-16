/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `bidang` DROP FOREIGN KEY `Bidang_idPimpinan_fkey`;

-- DropForeignKey
ALTER TABLE `bidang` DROP FOREIGN KEY `Bidang_idUser_fkey`;

-- DropIndex
DROP INDEX `Bidang_idPimpinan_fkey` ON `bidang`;

-- DropIndex
DROP INDEX `Bidang_idUser_fkey` ON `bidang`;

-- AlterTable
ALTER TABLE `bidang` MODIFY `idUser` VARCHAR(191) NOT NULL,
    MODIFY `idPimpinan` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `jabatan` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `jab` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `img` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `nip` VARCHAR(191) NOT NULL DEFAULT '',
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Bidang` ADD CONSTRAINT `Bidang_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bidang` ADD CONSTRAINT `Bidang_idPimpinan_fkey` FOREIGN KEY (`idPimpinan`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
