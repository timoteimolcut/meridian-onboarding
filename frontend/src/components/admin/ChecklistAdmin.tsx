import { useEffect, useState } from "react";
import { createTask, getTasks, updateTaskStatus, deleteTask} from "../../api/checklist";
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
        const newTask = await createTask({title, description, week, is_completed: false});
        setTasks((prev) => [...prev, newTask]);
        setTitle(""); setDescription(""); setWeek(1);
    }
    async function handleToggle(task: ChecklistTask) {
        const updated = await updateTaskStatus(task.id, !task.is_completed);
        setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    }
    async function handleDelete(id: number) {
        await deleteTask(id);
        setTasks((prev) => prev.filter((e) => e.id !== id));
    }

    return (
        <div>
            <h3> Tasks </h3>
            <ul>
                {tasks.map((t) => (
                    <li key={t.id}>
                        {t.is_completed ? "✅" : "⬜"} {t.title} / Week {t.week}: {t.description}
                        <button onClick={() => handleToggle(t)}>
                            {t.is_completed ? "Mark Incomplete" : "Mark Completed"}
                        </button>
                        <button onClick={() => handleDelete(t.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h4> Add New Task</h4>
            <input placeholder="Title" value={title} onChange={(ev) => setTitle(ev.target.value)} />
            <input placeholder="Description" value={description} onChange={(ev) => setDescription(ev.target.value)} />
            <input placeholder="Week" value={week} onChange={(ev) => setWeek(parseInt(ev.target.value))} />
            <button onClick={handleCreate} >Add Task</button>
        </div>
    );
}

export default ChecklistAdmin;