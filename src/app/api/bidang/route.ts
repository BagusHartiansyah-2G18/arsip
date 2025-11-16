import {portal} from "@/lib/api/userGuard";
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'; 
 
const prisma = new PrismaClient();
export async function GET(req: NextRequest ) { 
    return portal(req, async (v) => {
      const { level,id } = v;
      let data = [];
      if(level == 1){ 
        const bidang = await prisma.bidang.findFirst({
          where:{
            idUser:id
          }
        });
        data = bidang ? [bidang] : [];
      }else{
        data = await prisma.bidang.findMany();
      } 
      console.log(data);
      
      return NextResponse.json(data);
    },[1,2]);
}

export async function POST(req: NextRequest ) {
  return portal(req, async (token) => { 
      // const { email, password } = await req.json();
      try {
        const body = await req.json();
        await prisma.arsip.create({data: {...body,idUser:token.id, created_by:token.id}});
        const result = await prisma.arsip.findFirst({
          orderBy: {
            created_at: 'desc',
          },
        });

        return NextResponse.json(result);
      } catch (error) { 
        return NextResponse.json({ success: false, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
      }
  });
} 