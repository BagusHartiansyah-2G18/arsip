import {portal} from "@/lib/api/userGuard";
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'; 
 
const prisma = new PrismaClient();
export async function GET(req: NextRequest ) { 
    return portal(req, async (token) => {
        const data = await prisma.arsip.groupBy({
          by: ['formAs','formNm'],
          where: {
            formAs: { 
              notIn: ['', '---'],
            },
          },
          _count: {
            id: true,
          } 
        });

        return NextResponse.json(data.map((v:{formAs:string,formNm:string})=>({
          value:JSON.stringify(JSON.parse(v.formNm).map((f:{})=>({...f,value:''}))),
          label:v.formAs,id:v.formAs}))||[]);
    },[1,2]);
}