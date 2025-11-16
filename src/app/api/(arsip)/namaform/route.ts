import {portal} from "@/lib/api/userGuard";
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'; 
 
const prisma = new PrismaClient();
export async function GET(req: NextRequest ) { 
    return portal(req, async (token) => {
        const data = await prisma.arsip.groupBy({
          by: ['formAs'],
          where: {
            formAs: { 
              notIn: ['', '---'],
            },
          },
          _count: {
            id: true,
          } 
        });

        return NextResponse.json(data.map((v:{formAs:string})=>({value:v.formAs,label:v.formAs,id:v.formAs}))||[]);
    },[1,2]);
}