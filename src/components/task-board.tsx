"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { Check, Plus, Trash2 } from "lucide-react";
import type { PrototypeTask } from "@/lib/prototype-types";
import { initialTasks } from "@/lib/prototype-data";
import { Card } from "@/components/ui/card";

const TASK_KEY = "aquascore_tasks";

const subscribe = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
};

const getSnapshot = () => {
  if (typeof window === "undefined") return initialTasks;
  const raw = window.localStorage.getItem(TASK_KEY);
  return raw ? (JSON.parse(raw) as PrototypeTask[]) : initialTasks;
};

const getServerSnapshot = () => initialTasks;

const saveTasks = (tasks: PrototypeTask[]) => {
  window.localStorage.setItem(TASK_KEY, JSON.stringify(tasks));
  window.dispatchEvent(new Event("storage"));
};

export function TaskBoard() {
  const tasks = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const openTasks = useMemo(() => tasks.filter((task) => !task.completed).length, [tasks]);

  const addTask = () => {
    if (title.trim().length < 3) return;
    const newTask: PrototypeTask = {
      id: crypto.randomUUID(),
      title: title.trim(),
      note: note.trim() || "New action added from the dashboard.",
      completed: false,
      createdAt: new Date().toISOString(),
    };
    saveTasks([newTask, ...tasks]);
    setTitle("");
    setNote("");
  };

  return (
    <Card title="Action Board" subtitle={`${openTasks} open actions tracked in localStorage`}>
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <input
          className="rounded-2xl border border-slate-200 px-4 py-3"
          placeholder="New water-saving action"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          className="rounded-2xl border border-slate-200 px-4 py-3"
          placeholder="Optional note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
        <button
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700"
          onClick={addTask}
          type="button"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      <div className="mt-4 grid gap-3">
        {tasks.map((task) => (
          <article key={task.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">{task.title}</p>
                <p className="text-sm text-slate-600">{task.note}</p>
              </div>
              <button
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${task.completed ? "bg-emerald-100 text-emerald-700" : "bg-sky-100 text-sky-700"}`}
                onClick={() =>
                  saveTasks(
                    tasks.map((item) =>
                      item.id === task.id ? { ...item, completed: !item.completed } : item,
                    ),
                  )
                }
                type="button"
              >
                <Check className="h-3 w-3" /> {task.completed ? "Done" : "Mark done"}
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs text-slate-500">Created {new Date(task.createdAt).toLocaleDateString()}</p>
              <button
                className="inline-flex items-center gap-1 text-sm font-semibold text-rose-600 hover:text-rose-700"
                onClick={() => saveTasks(tasks.filter((item) => item.id !== task.id))}
                type="button"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </Card>
  );
}
