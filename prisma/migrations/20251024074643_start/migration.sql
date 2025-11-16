-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `pass` VARCHAR(191) NOT NULL,
    `nip` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dinas` (
    `id` VARCHAR(191) NOT NULL,
    `nm` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bidang` (
    `id` VARCHAR(191) NOT NULL,
    `nm` VARCHAR(191) NOT NULL,
    `idUser` INTEGER NOT NULL,
    `idPimpinan` INTEGER NOT NULL,
    `jabatan` VARCHAR(191) NOT NULL,
    `jab` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NOT NULL,
    `idDin` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bidang` ADD CONSTRAINT `Bidang_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bidang` ADD CONSTRAINT `Bidang_idPimpinan_fkey` FOREIGN KEY (`idPimpinan`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bidang` ADD CONSTRAINT `Bidang_idDin_fkey` FOREIGN KEY (`idDin`) REFERENCES `Dinas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
