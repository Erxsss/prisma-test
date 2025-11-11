import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request, res: Response) => {
  await prisma.todo.deleteMany();
  return NextResponse.json("deleted all");
};
