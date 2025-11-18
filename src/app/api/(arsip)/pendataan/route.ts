import {portal} from "@/lib/api/userGuard";
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'; 
 
const prisma = new PrismaClient();
export async function GET(req: NextRequest ) { 
    return portal(req, async (v) => {
        const { level,id } = v;
        const where = level === 1 ? { idUser: id } : {}; 
        
        const data = await prisma.arsip.findMany({
          where,
          include: {
            bidang: true,
          }, 
        });   
        return NextResponse.json(data);
    },[1,2]);
}

export async function POST(req: NextRequest ) {
  return portal(req, async (v) => {  
       const { level,id } = v;
        const where = level === 1 ? { idUser: id } : {}; 
        
      try { 
        const body = await req.json(); 
        await prisma.arsip.create({data: {...body,idUser:id, created_by:id,formNm:"",formVal:""}});
        const result = await prisma.arsip.findFirst({
          where,
          orderBy: {
            created_at: 'desc',
          },
        });

        return NextResponse.json(result);
      } catch (error) { 
        return NextResponse.json({ success: false,  error: error instanceof Error ? error.message : String(error), }, { status: 500 });
      }
  },[1,2]);
} 