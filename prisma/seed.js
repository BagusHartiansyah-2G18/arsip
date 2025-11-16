import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';


const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // await prisma.user.createMany({
  //   data: [
  //     {
  //     name: 'Sekretariat',
  //     email: 'sekretariat@bpkad.com',
  //     pass: hashedPassword,
  //     level:1
  //   },{
  //     name: 'Anggaran',
  //     email: 'anggaran@bpkad.com',
  //     pass: hashedPassword,
  //     level:1
  //   },{
  //     name: 'Perbendaharaan',
  //     email: 'perbendaharaan@bpkad.com',
  //     pass: hashedPassword,
  //     level:1
  //   },{
  //     name: 'Akuntansi',
  //     email: 'akuntansi@bpkad.com',
  //     pass: hashedPassword,
  //     level:1
  //   },{
  //     name: 'Aset',
  //     email: 'aset@bpkad.com',
  //     pass: hashedPassword,
  //     level:1
  //   },
  //   ]
  // });

  // await prisma.dinas.create({
  //   data:{
  //     nm:"BADAN PENGELOLAAN KEUANGAN DAN ASET DAERAH"
  //   }
  // })
  // await prisma.bidang.create({
  //   data:{
  //     nm:'Anggaran',
  //     idDin:'93a0d0d7-63f4-44f7-b708-fa05279d7fd0',
  //     idUser:'9fce9ae9-c88d-42d7-a675-e924118b9b84',
  //     jabatan:"Kapala Bidang Anggaran",
  //     jab:"Kabid Anggaran",
  //     idPimpinan:'9fce9ae9-c88d-42d7-a675-e924118b9b84',
  //   }
  // })
  await prisma.bidang.createMany({
    data:[
      {
        nm:'Akuntansi',
        idDin:'93a0d0d7-63f4-44f7-b708-fa05279d7fd0',
        idUser:'3f442bd5-a911-4ac7-b33d-e5ee6657232c',
        jabatan:"Kapala Bidang Akuntansi",
        jab:"Kabid Anggaran",
        idPimpinan:'3f442bd5-a911-4ac7-b33d-e5ee6657232c',
      },{
        nm:'Sekretariat',
        idDin:'93a0d0d7-63f4-44f7-b708-fa05279d7fd0',
        idUser:'9fce9ae9-c88d-42d7-a675-e924118b9b84',
        jabatan:"Sekretariat",
        jab:"Sekretariat",
        idPimpinan:'9fce9ae9-c88d-42d7-a675-e924118b9b84',
      },{
        nm:'Perbendaharaan',
        idDin:'93a0d0d7-63f4-44f7-b708-fa05279d7fd0',
        idUser:'81c52ba6-b5fd-426b-a715-82553eb08f27',
        jabatan:"Kapala Bidang Perbendaharaan",
        jab:"Kabid Perbendaharaan",
        idPimpinan:'81c52ba6-b5fd-426b-a715-82553eb08f27',
      },{
        nm:'Aset',
        idDin:'93a0d0d7-63f4-44f7-b708-fa05279d7fd0',
        idUser:'b3256555-4ea8-4eeb-9496-15818f229b8e',
        jabatan:"Bidang Aset",
        jab:"Kabid Aset",
        idPimpinan:'b3256555-4ea8-4eeb-9496-15818f229b8e',
      }
      ]
  })
  console.log('✅ User seeded');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
