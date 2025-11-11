"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState, ChangeEvent } from "react";
import { Trash2, Plus, ListTodo } from "lucide-react";

type Todo = {
  id: string;
  todo: string;
  status: boolean;
};

export default function Home() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const createTodo = async () => {
    if (!input.trim()) return;
    await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify({ todo: input }),
    });
    setInput("");
    findTodos();
  };

  const deleteTodo = async (todoId: string) => {
    await fetch("/api/todo", {
      method: "DELETE",
      body: JSON.stringify({ id: todoId }),
    });
    findTodos();
  };

  const findTodos = async () => {
    const res = await fetch("/api/todo", { method: "GET" });
    const allTodos = await res.json();
    setTodos(allTodos);
  };

  const deleteAllTodo = async () => {
    await fetch("/api/deleteAll", { method: "DELETE" });
    findTodos();
  };

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    findTodos();
  }, []);
  const changeStatus = async (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const changedTodo = await fetch("/api/todo", {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        status: e.target.checked,
      }),
    });
    findTodos();
    console.log(changedTodo);
  };
  return (
    <div className="w-screen h-screen flex flex-col items-center beautful from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white p-8">
      <Card className="w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-700 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg">
        <CardHeader className="flex flex-col items-center space-y-3">
          <ListTodo className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          <CardTitle className="text-2xl font-bold tracking-tight">
            My Todo List
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter your next task..."
              value={input}
              onChange={handleInputValue}
              className="rounded-xl px-4 py-2"
            />
            <Button
              onClick={createTodo}
              className="bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add
            </Button>
          </div>

          <div className="mt-6 space-y-3 max-h-[45vh] overflow-y-auto pr-2">
            {todos.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
                No todos yet. Add something!
              </div>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex justify-between items-center bg-slate-100 dark:bg-slate-700 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition"
                >
                  <div className="truncate">{todo.todo}</div>
                  <div className="flex justify-center items-center">
                    <Input
                      type="checkbox"
                      className="w-[20px] h-[20px]"
                      checked={todo.status}
                      onChange={(e) => changeStatus(e, todo.id)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTodo(todo.id)}
                      className="hover:bg-red-100 dark:hover:bg-red-900/30"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {todos.length > 0 && (
            <div className="flex justify-center mt-4">
              <Button
                onClick={deleteAllTodo}
                variant="destructive"
                className="rounded-xl px-6 py-2"
              >
                Delete All
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
