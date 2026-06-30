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
    setTasks((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  }

  if (loading) return <p>Loading checklist...</p>;

  return (
    <div>
      <h2>My Onboarding Checklist</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.is_completed}
                onChange={() => handleToggle(task)}
              />
              <strong>{task.title}</strong> (Week {task.week})
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Checklist;