import {portal} from "@/lib/api/userGuard";
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'; 
 
const prisma = new PrismaClient();
export async function GET(req: NextRequest ) { 
    return portal(req, async (token) => {
        const groupedData = await prisma.arsip.groupBy({
          by: ['idBidang'],
          _count: {
            _all: true,
          },
        });
        const bidangIds = groupedData.map((item:{idBidang:string}) => item.idBidang );

        const bidangData = await prisma.bidang.findMany({
          where: {
            id: {
              in: bidangIds,
            },
          },
        });

        // Gabungkan hasilnya
        const data = groupedData.map((item:{idBidang:string,_count:{_all:number}}) => {
          const bidang = bidangData.find((b:{id:string}) => b.id === item.idBidang);
          return {
            idBidang: item.idBidang,
            count: item._count._all,
            bidang,
          };
        });

        return NextResponse.json(data);
    },[1,2]);
}