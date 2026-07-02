import { useEffect, useState } from "react";
import { createEmployee, getEmployees, getEmployee, deleteEmployee} from "../../api/employees"
import type { Employee } from "../../api/types";

function EmployeeAdmin() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [role, setRole] = useState("");
    const [slackHandle, setSlackHandle] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        getEmployees().then((data) => setEmployees(data));
    }, []);
    async function handleCreate() {
        const newEmployee = await createEmployee({ name, department, role, slack_handle: slackHandle, email });
        setEmployees((prev) => [...prev, newEmployee]);
        setName(""); setDepartment(""); setRole(""); setSlackHandle(""); setEmail("");
    }
    async function handleDelete(id: number) {
        await deleteEmployee(id);
        setEmployees((prev) => prev.filter((e) => e.id !== id));
    }
    return (
        <div>
            <h3> Employees </h3>
            <ul>
                {employees.map((e) => (
                    <li key={e.id}>
                        {e.name} - {e.role} ({e.department})
                        <button onClick={() => handleDelete(e.id)}> Delete </button>
                    </li>
                ))}
            </ul>
        
            <h4> Add A New Employee</h4>
            <input placeholder="Name" value={name} onChange={(ev) => setName(ev.target.value)} />
            <input placeholder="Department" value={department} onChange={(ev) => setDepartment(ev.target.value)} />
            <input placeholder="Role" value={role} onChange={(ev) => setRole(ev.target.value)} />
            <input placeholder="Slack Handle" value={slackHandle} onChange={(ev) => setSlackHandle(ev.target.value)} />
            <input placeholder="Email" value={email} onChange={(ev) => setEmail(ev.target.value)} />
            <button onClick={handleCreate}> Add Employee </button>
        </div>
    );
}
export default EmployeeAdmin;