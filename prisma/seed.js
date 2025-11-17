const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // await prisma.user.createMany({
  //   data: [
  //     { name: 'Admin', email: 'admin@bpkad.com', pass: hashedPassword, level: 1 },
  //     { name: 'Sekretariat', email: 'sekretariat@bpkad.com', pass: hashedPassword, level: 1 },
  //     { name: 'Anggaran', email: 'anggaran@bpkad.com', pass: hashedPassword, level: 1 },
  //     { name: 'Perbendaharaan', email: 'perbendaharaan@bpkad.com', pass: hashedPassword, level: 1 },
  //     { name: 'Akuntansi', email: 'akuntansi@bpkad.com', pass: hashedPassword, level: 1 },
  //     { name: 'Aset', email: 'aset@bpkad.com', pass: hashedPassword, level: 1 },
  //   ],
  // });
//   const users = [
//     { name: 'Admin', email: 'admin@bpkad.com', pass: hashedPassword, level: 1 },
//     { name: 'Sekretariat', email: 'sekretariat@bpkad.com', pass: hashedPassword, level: 1 },
//     { name: 'Anggaran', email: 'anggaran@bpkad.com', pass: hashedPassword, level: 1 },
//     { name: 'Perbendaharaan', email: 'perbendaharaan@bpkad.com', pass: hashedPassword, level: 1 },
//     { name: 'Akuntansi', email: 'akuntansi@bpkad.com', pass: hashedPassword, level: 1 },
//     { name: 'Aset', email: 'aset@bpkad.com', pass: hashedPassword, level: 1 },
// ];

  // for (const user of users) {
  //   try {
  //     await prisma.user.create({ data: user });
  //   } catch (error) {
  //     if (error.code === 'P2002') {
  //       console.log(`⚠️ Email sudah ada: ${user.email}`);
  //     } else {
  //       throw error;
  //     }
  //   }
  // }


  const data= [
      {
        nm: 'Akuntansi',
        idDin: '93a0d0d7-63f4-44f7-b708-fa05279d7fd0',
        idUser: '3c18a0d5-744b-41df-b38a-fb0ce91a09b3',
        jabatan: 'Kapala Bidang Akuntansi',
        jab: 'Kabid Anggaran',
        idPimpinan: '3c18a0d5-744b-41df-b38a-fb0ce91a09b3',
      },
      {
        nm: 'Sekretariat',
        idDin: '93a0d0d7-63f4-44f7-b708-fa05279d7fd0',
        idUser: 'd34f60b0-17e5-4b06-9052-3c2f026dcd25',
        jabatan: 'Sekretariat',
        jab: 'Sekretariat',
        idPimpinan: 'd34f60b0-17e5-4b06-9052-3c2f026dcd25',
      },
      {
        nm: 'Perbendaharaan',
        idDin: '93a0d0d7-63f4-44f7-b708-fa05279d7fd0',
        idUser: '7550d4ce-7dd7-4ac7-96c7-3b745df070d2',
        jabatan: 'Kapala Bidang Perbendaharaan',
        jab: 'Kabid Perbendaharaan',
        idPimpinan: '7550d4ce-7dd7-4ac7-96c7-3b745df070d2',
      },
      {
        nm: 'Aset',
        idDin: '93a0d0d7-63f4-44f7-b708-fa05279d7fd0',
        idUser: 'a6cc3325-ea59-4709-9f76-e626f7d4f2f4',
        jabatan: 'Bidang Aset',
        jab: 'Kabid Aset',
        idPimpinan: 'a6cc3325-ea59-4709-9f76-e626f7d4f2f4',
      },{
        nm: 'Anggaran',
        idDin: '93a0d0d7-63f4-44f7-b708-fa05279d7fd0',
        idUser: '1d4effe2-12c0-40e7-9980-4f3bc969dca0',
        jabatan: 'Bidang Anggaran',
        jab: 'Kabid Anggaran',
        idPimpinan: '1d4effe2-12c0-40e7-9980-4f3bc969dca0',
      },
  ];
  for (const user of data) {
    try {
      await prisma.bidang.create({ data: user });
    } catch (error) {
      if (error.code === 'P2002') {
        console.log(`⚠️ Email sudah ada: ${user.email}`);
      } else {
        throw error;
      }
    }
  }

  console.log('✅ User seeded');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());