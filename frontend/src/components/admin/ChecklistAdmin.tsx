import { useEffect, useState } from "react";
import { createTask, getTasks, updateTaskStatus, deleteTask } from "../../api/checklist";
import type { ChecklistTask } from "../../api/types";

function ChecklistAdmin() {
  const [tasks, setTasks] = useState<ChecklistTask[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [week, setWeek] = useState(1);

  useEffect(() => {
    getTasks().then((data) => setTasks(data));
  }, []);

  async function handleCreate() {
    const newTask = await createTask({ title, description, week, is_completed: false });
    setTasks((prev) => [...prev, newTask]);
    setTitle(""); setDescription(""); setWeek(1);
  }

  async function handleToggle(task: ChecklistTask) {
    const updated = await updateTaskStatus(task.id, !task.is_completed);
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  async function handleDelete(id: number) {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const inputClass = "w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500";

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Checklist Tasks</h3>
      <div className="flex flex-col gap-2 mb-6">
        {tasks.map((t) => (
          <div key={t.id} className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-3">
            <div className="flex items-center gap-3">
              <span className={t.is_completed ? "text-gray-500 line-through" : "text-white"}>
                {t.title}
              </span>
              <span className="text-indigo-400 text-xs">Week {t.week}</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => handleToggle(t)} className="text-indigo-400 hover:text-indigo-300 text-sm transition">
                {t.is_completed ? "Undo" : "Complete"}
              </button>
              <button onClick={() => handleDelete(t.id)} className="text-red-400 hover:text-red-300 text-sm transition">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <h4 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-3">Add New Task</h4>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <input className={inputClass} placeholder="Title" value={title} onChange={(ev) => setTitle(ev.target.value)} />
        <input className={inputClass} placeholder="Week (1-4)" type="number" min={1} max={4} value={week} onChange={(ev) => setWeek(parseInt(ev.target.value))} />
        <input className={`${inputClass} col-span-2`} placeholder="Description (optional)" value={description} onChange={(ev) => setDescription(ev.target.value)} />
      </div>
      <button onClick={handleCreate} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg text-sm font-medium transition">
        Add Task
      </button>
    </div>
  );
}

export default ChecklistAdmin;