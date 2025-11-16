import {portal} from "@/lib/api/userGuard";
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient,Prisma } from '@prisma/client';  
const prisma = new PrismaClient();
export async function GET(req: NextRequest ) { 
    return portal(req, async (v) => {
      const { level,id } = v;
      const where = level === 1 ? { idUser: id } : {}; 
       
      const format = async (key: Prisma.ArsipScalarFieldEnum) =>
        (await prisma.arsip.groupBy({
          by: [key],
          where,
          _count: { id: true },
        })).map(
          (item: Record<string, unknown> & { _count: { id: number } }) => ({
            nama: String(item[key]),
            total: item._count.id,
          })
        );

      const resp = {
        data: await format('formAs'),
        kd: await format('kd'),
        status: await format('status'),
        total: await prisma.arsip.count({ where }),
      }; 
      return NextResponse.json([resp]);

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