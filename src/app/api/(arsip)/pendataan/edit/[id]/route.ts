import {portal} from "@/lib/api/userGuard";
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
 
const prisma = new PrismaClient(); 

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: paramId } = await context.params;
  return portal(req, async (token) => {
    try {
      
      const formData = await req.formData(); // ⬅️ gunakan ini untuk multipart/form-data

      
      const id = formData.get('id') as string;
      const kd = formData.get('kd') as string;
      const uraian = formData.get('uraian') as string;
      const uraianPoint = formData.get('uraianPoint') as string;

      const uraianPointC = formData.get('uraianPointC') as string;
      const tgl = formData.get('tgl') as string;
      const docStatus = formData.get('docStatus') as string;

      const docC = formData.get('docC') as string;
      const file = formData.get('file') as string;
      const idBidang = formData.get('idBidang') as string;

      const kategori = formData.get('kategori') as string;
      const jenis = formData.get('jenis') as string;
      const rentang = formData.get('rentang') as string;

      const retensi = formData.get('retensi') as string;
      const keterangan = formData.get('keterangan') as string;
      const status = formData.get('status') as string;

      const updated = await prisma.arsip.update({
        where: { id: paramId },
        data: { 
          kd,uraian,uraianPoint,uraianPointC,tgl,docStatus,
          docC,file,idBidang,kategori,jenis,rentang,retensi,keterangan,status
        },  
      });


      return NextResponse.json(updated);
    } catch (error) { 
      
      return NextResponse.json(
        { success: false,  error: error instanceof Error ? error.message : String(error), },
        { status: 500 }
      );
    }
  },[1,2]);
}
