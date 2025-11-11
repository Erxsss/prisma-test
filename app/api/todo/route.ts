import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  const { todo } = await req.json();
  const newTodo = await prisma.todo.create({
    data: {
      todo,
    },
  });
  console.log(todo, "todoooo");
  return NextResponse.json(newTodo);
};
export const DELETE = async (req: Request, res: Response) => {
  const body = await req.json();
  await prisma.todo.delete({
    where: {
      id: body.id,
    },
  });
  return NextResponse.json({ message: "Deleted" });
};
export const GET = async (req: Request, res: Response) => {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos);
};
export const PUT = async (req: Request, res: Response) => {
  const body = await req.json();
  const changedTodo = await prisma.todo.update({
    where: {
      id: body.id,
    },
    data: {
      status: body.status,
    },
  });
  return NextResponse.json(changedTodo);
};
