-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `pass` VARCHAR(191) NOT NULL,
    `nip` VARCHAR(191) NOT NULL DEFAULT '',
    `level` INTEGER NOT NULL DEFAULT 1,

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
    `idUser` VARCHAR(191) NOT NULL,
    `idPimpinan` VARCHAR(191) NOT NULL DEFAULT '',
    `jabatan` VARCHAR(191) NOT NULL DEFAULT '',
    `jab` VARCHAR(191) NOT NULL DEFAULT '',
    `img` VARCHAR(191) NOT NULL DEFAULT '',
    `idDin` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Arsip` (
    `id` VARCHAR(191) NOT NULL,
    `idUser` VARCHAR(191) NOT NULL,
    `idBidang` VARCHAR(191) NOT NULL,
    `kategori` VARCHAR(191) NOT NULL,
    `jenis` VARCHAR(191) NOT NULL,
    `rentang` VARCHAR(191) NOT NULL,
    `retensi` VARCHAR(191) NOT NULL,
    `keterangan` VARCHAR(191) NOT NULL,
    `kd` VARCHAR(191) NOT NULL,
    `uraian` VARCHAR(191) NOT NULL,
    `uraianPoint` VARCHAR(191) NOT NULL,
    `uraianPointC` VARCHAR(191) NOT NULL,
    `tgl` VARCHAR(191) NOT NULL,
    `docStatus` VARCHAR(191) NOT NULL,
    `docC` VARCHAR(191) NOT NULL,
    `file` LONGTEXT NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `formAs` VARCHAR(191) NOT NULL DEFAULT '',
    `formNm` LONGTEXT NOT NULL,
    `formVal` LONGTEXT NOT NULL,
    `created_by` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bidang` ADD CONSTRAINT `Bidang_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bidang` ADD CONSTRAINT `Bidang_idPimpinan_fkey` FOREIGN KEY (`idPimpinan`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bidang` ADD CONSTRAINT `Bidang_idDin_fkey` FOREIGN KEY (`idDin`) REFERENCES `Dinas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Arsip` ADD CONSTRAINT `Arsip_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Arsip` ADD CONSTRAINT `Arsip_idBidang_fkey` FOREIGN KEY (`idBidang`) REFERENCES `Bidang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
