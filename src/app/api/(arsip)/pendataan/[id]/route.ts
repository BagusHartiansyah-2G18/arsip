import {portal} from "@/lib/api/userGuard";
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
 
const prisma = new PrismaClient();
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  return portal(req, async (token) => {
    const data = await prisma.arsip.findFirst({
      where: {
        id,
      },
    });

    return NextResponse.json([data]);
  }, [1, 2]);
}

export async function POST(req: NextRequest ) {
  return portal(req, async (token) => { 
      // const { email, password } = await req.json();
      try {
        // const body = await req.json();
        // await prisma.arsip.create({data: {...body,idUser:token.id, created_by:token.id}});
        // const result = await prisma.arsip.findFirst({
        //   orderBy: {
        //     created_at: 'desc',
        //   },
        // });

        return NextResponse.json([{result:"0"}]);
      } catch (error) { 
        return NextResponse.json({ success: false,  error: error instanceof Error ? error.message : String(error),}, { status: 500 });
      }
  });
} 
 
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: paramId } = await context.params;

  return portal(req, async (token) => {
    try {
      const formData = await req.formData(); // ⬅️ untuk multipart/form-data

      const formAs = formData.get('formAs') as string;
      const formNm = formData.get('formNm') as string;
      const formVal = formData.get('formVal') as string;

      const updated = await prisma.arsip.update({
        where: { id: paramId },
        data: { formAs, formNm, formVal },
      });

      return NextResponse.json(updated);
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
  }, [1, 2]);
}


export async function DELETE(
  req: NextRequest,
 context: { params: Promise<{ id: string }> }
) {
  const { id: paramId } = await context.params;

  return portal(req, async (token) => {
    try { 
      const deletes = await prisma.arsip.delete({
        where: { id: paramId }
      });
      const remaining = await prisma.arsip.findMany(); 
      return NextResponse.json(remaining);
    } catch (error) {  
      return NextResponse.json(
        { success: false,  error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  },[1,2]);
}
