import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const JWT_SECRET = "2g18@mantap";
const prisma = new PrismaClient(); 
export async function POST(req: NextRequest) {
  const { email, password } = await req.json(); 
  if (!email || !password) {
    return NextResponse.json({ error: "Email dan password dibutuhkan" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 }); 
  
  const isValid = await bcrypt.compare(password, user.pass);
  if (!isValid) return NextResponse.json({ error: "Password salah" }, { status: 401 });
 
  // Buat JWT
  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, level: user.level },
    JWT_SECRET,
    { expiresIn: "7d" }
  ); 
  
  // Return token
  return NextResponse.json(token);
}
