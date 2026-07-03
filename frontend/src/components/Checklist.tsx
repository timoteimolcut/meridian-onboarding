import { useEffect, useState } from "react";
import { getTasks, updateTaskStatus } from "../api/checklist";
import type { ChecklistTask } from "../api/types";

function Checklist() {
  const [tasks, setTasks] = useState<ChecklistTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTasks()
      .then((data) => setTasks(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  async function handleToggle(task: ChecklistTask) {
    const updated = await updateTaskStatus(task.id, !task.is_completed);
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  const weeks = [1, 2, 3, 4];
  const completedCount = tasks.filter((t) => t.is_completed).length;
  const totalCount = tasks.length;
  const percentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  if (loading) return <p className="text-gray-400">Loading checklist...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">My Onboarding Checklist</h2>
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Overall progress</span>
          <span className="text-indigo-400 font-medium">{completedCount}/{totalCount} tasks completed</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-right text-xs text-gray-500 mt-1">{percentage}%</p>
      </div>
      {weeks.map((week) => (
        <div key={week} className="mb-8">
          <h3 className="text-indigo-400 font-semibold text-sm uppercase tracking-wider mb-3">Week {week}</h3>
          <div className="flex flex-col gap-3">
            {tasks.filter((t) => t.week === week).map((task) => (
              <div
                key={task.id}
                onClick={() => handleToggle(task)}
                className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition ${
                  task.is_completed
                    ? "bg-gray-900 border-gray-800 opacity-60"
                    : "bg-gray-900 border-gray-700 hover:border-indigo-500"
                }`}
              >
                <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  task.is_completed ? "bg-indigo-600 border-indigo-600" : "border-gray-500"
                }`}>
                  {task.is_completed && <span className="text-white text-xs">✓</span>}
                </div>
                <div>
                  <p className={`font-medium ${task.is_completed ? "line-through text-gray-500" : "text-white"}`}>
                    {task.title}
                  </p>
                  {task.description && <p className="text-gray-400 text-sm mt-1">{task.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Checklist;