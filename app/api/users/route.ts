import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();

  const user = await prisma.user.create({
    data: {
      username: body.username,
      email: body.email,
      profilePic: body.profilePic,
    },
  });
  return NextResponse.json(user);
};
export const GET = async (_req: Request, _res: Response) => {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
};
