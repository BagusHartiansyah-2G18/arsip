import {portal} from "@/lib/api/userGuard";
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'; 
 
const prisma = new PrismaClient();
export async function GET(req: NextRequest ) { 
    return portal(req, async (v) => {
      const { level, id } = v; 
      const where = level === 1 ? { idUser: id } : {};
       
      const bidang = await prisma.bidang.findFirst({
        where
      })  
      const whereBid = level === 1 ? { idBidang: bidang?.id } : {};
      
      const groupedData = await prisma.arsip.groupBy({
        by: ['idBidang'], 
        where:whereBid,
        _count: {
          _all: true,
        },
      });

      const bidangIds = groupedData.map((item:{idBidang:string}) => item.idBidang);

      const bidangData = await prisma.bidang.findMany({
        where: {
          id: {
            in: bidangIds,
          },
        },
      });

      const data = groupedData.map((item:{idBidang:string,_count:{_all:number}}) => {
        const bidang = bidangData.find((b:{id:string}) => b.id === item.idBidang);
        return {
          idBidang: item.idBidang,
          count: item._count._all,
          bidang,
        };
      });

      return NextResponse.json(data);
    }, [1, 2]);

}