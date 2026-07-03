import { useEffect, useState } from "react";
import { createEmployee, getEmployees, deleteEmployee } from "../../api/employees";
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

  const inputClass = "w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500";

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Employees</h3>
      <div className="flex flex-col gap-2 mb-6">
        {employees.map((e) => (
          <div key={e.id} className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-3">
            <div>
              <span className="text-white font-medium">{e.name}</span>
              <span className="text-gray-400 text-sm ml-2">— {e.role} ({e.department})</span>
            </div>
            <button onClick={() => handleDelete(e.id)} className="text-red-400 hover:text-red-300 text-sm transition">
              Delete
            </button>
          </div>
        ))}
      </div>
      <h4 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-3">Add New Employee</h4>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <input className={inputClass} placeholder="Name" value={name} onChange={(ev) => setName(ev.target.value)} />
        <input className={inputClass} placeholder="Department" value={department} onChange={(ev) => setDepartment(ev.target.value)} />
        <input className={inputClass} placeholder="Role" value={role} onChange={(ev) => setRole(ev.target.value)} />
        <input className={inputClass} placeholder="Slack Handle" value={slackHandle} onChange={(ev) => setSlackHandle(ev.target.value)} />
        <input className={inputClass} placeholder="Email" value={email} onChange={(ev) => setEmail(ev.target.value)} />
      </div>
      <button onClick={handleCreate} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg text-sm font-medium transition">
        Add Employee
      </button>
    </div>
  );
}

export default EmployeeAdmin;