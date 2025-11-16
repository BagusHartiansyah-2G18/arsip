import { NextResponse,NextRequest  } from "next/server";
import jwt from "jsonwebtoken";  
const JWT_SECRET = "2g18@mantap"; 

export async function userGuard(req: NextRequest , options?: { level?: number }) {
 const authHeader = req.headers.get("Authorization");
  if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const token = authHeader.split(" ")[1];
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any; 
    
    return decoded;
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
 
export async function portal(req: NextRequest,callback: (token: any) => Promise<Response>, level:number[] =[1]) {
  const guard = await userGuard(req);
  if (guard instanceof NextResponse) return guard;
  if (!level.includes(guard.level)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  } 
  return callback(guard);
}
